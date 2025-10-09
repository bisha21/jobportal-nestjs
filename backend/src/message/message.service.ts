/* eslint-disable prettier/prettier */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateConversationDto } from './dto/createConversation.dto';
import { CreateMessageDto } from './dto/createMessage.dto';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: DatabaseService) {}

  async createConversation(
    createConversationDto: CreateConversationDto,
    userId: number,
  ) {
    const { jobId, participants } = createConversationDto;

    let employeeId: number | undefined;
    if (jobId) {
      const job = await this.prisma.job.findUnique({
        where: { id: jobId },
        include: { company: true },
      });
      if (!job) throw new NotFoundException('Job not found');
      employeeId = job.company.ownerId;
    }

    let conversation = await this.prisma.conversation.findFirst({
      where: {
        jobId: jobId ?? null,
        AND: [
          { participants: { some: { id: userId } } },
          participants?.length
            ? { participants: { some: { id: participants[0] } } }
            : {},
        ],
      },
      select: {
        id: true,
        jobId: true,
        createdAt: true,
        updatedAt: true,
        participants: {
          select: {
            id: true,
            email: true,
            fullName: true,
            profile: true,
            phoneNumber: true,
            role: true,
          },
        },
        messages: {
          select: {
            id: true,
            senderId: true,
            receiverId: true,
            content: true,
            read: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!conversation) {
      const participantIds = [userId, ...(participants || [])];
      if (employeeId) participantIds.push(employeeId);
      const uniqueParticipantIds = [...new Set(participantIds)];

      conversation = await this.prisma.conversation.create({
        data: {
          jobId: jobId ?? null,
          participants: {
            connect: uniqueParticipantIds.map((id) => ({ id })),
          },
        },
        select: {
          id: true,
          jobId: true,
          createdAt: true,
          updatedAt: true,
          participants: {
            select: {
              id: true,
              email: true,
              fullName: true,
              profile: true,
              phoneNumber: true,
              role: true,
            },
          },
          messages: {
            select: {
              id: true,
              senderId: true,
              receiverId: true,
              content: true,
              read: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });
    }

    return conversation;
  }

  async sendMessage(createMessageDto: CreateMessageDto, userId: number) {
    const { receiverId, conversationId, content } = createMessageDto;

    if (!receiverId) {
      throw new NotFoundException('receiverId is required');
    }

    let convoId = conversationId;

    // If conversationId missing → create conversation
    if (!convoId) {
      const conversation = await this.createConversation(
        { participants: [receiverId] },
        userId,
      );
      convoId = conversation.id;
    }

    const conversationExists = await this.prisma.conversation.findUnique({
      where: { id: convoId },
    });
    if (!conversationExists) {
      throw new NotFoundException('Conversation not found');
    }

    const message = await this.prisma.message.create({
      data: {
        senderId: userId,
        receiverId,
        conversationId: convoId,
        content,
      },
    });

    return message;
  }

  async getAllMessageByConversation(conversationId: number) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
    });
    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    const messages = await this.prisma.message.findMany({
      where: { conversationId },
      select: {
        id: true,
        senderId: true,
        receiverId: true,
        content: true,
        read: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    return messages;
  }

  async getApplicantsForCompanyOwner(ownerId: number) {
    const applicants = await this.prisma.application.findMany({
      where: {
        job: { company: { ownerId } },
      },
      distinct: ['userId'],
      include: {
        user: {
          select: { id: true, fullName: true, email: true, profile: true },
        },
        job: {
          select: {
            id: true,
            title: true,
            company: { select: { name: true } },
          },
        },
      },
    });

    // Remove owner themselves
    const filteredApplicants = applicants.filter((a) => a.user.id !== ownerId);

    const results = await Promise.all(
      filteredApplicants.map(async (a) => {
        const conversation = await this.prisma.conversation.findFirst({
          where: {
            participants: { some: { id: a.user.id } },
          },
          orderBy: { updatedAt: 'desc' }, // Optional: latest conversation first
        });

        return {
          userId: a.user.id,
          name: a.user.fullName,
          email: a.user.email,
          profile: a.user.profile,
          jobTitle: a.job.title,
          companyName: a.job.company.name,
          conversationId: conversation?.id || null, // Pass found conversation ID
          // lastMessage: conversation?.messages?.[0]?.content || null,
          timestamp: conversation
            ? this.getTimeAgo(conversation.updatedAt)
            : null,
          unread: 0,
          online: false,
        };
      }),
    );

    return results;
  }

  async getAllConversation() {
    return this.prisma.conversation.findMany({
      include: {
        participants: {
          select: { id: true, fullName: true, email: true, profile: true },
        },
        messages: true,
      },
    });
  }

  private getTimeAgo(date: Date): string {
    const diff = (Date.now() - date.getTime()) / 1000;
    if (diff < 60) return `${Math.floor(diff)}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }

  async getJobsUserAppliedTo(userId: number) {
  // 1️⃣ Fetch all jobs the user has applied to
  const applications = await this.prisma.application.findMany({
    where: { userId },
    include: {
      job: {
        select: {
          id: true,
          title: true,
          company: {
            select: {
              id: true,
              name: true,
              ownerId: true,
            },
          },
        },
      },
    },
  });

  // 2️⃣ Get unique company owners (avoid duplicates if applied to multiple jobs in same company)
  const uniqueOwners = new Map<number, any>();
  for (const app of applications) {
    const ownerId = app.job.company.ownerId;
    if (!uniqueOwners.has(ownerId)) {
      uniqueOwners.set(ownerId, app.job.company);
    }
  }

  // 3️⃣ Prepare result for each unique company owner
  const results = await Promise.all(
    Array.from(uniqueOwners.values()).map(async (company) => {
      const ownerId = company.ownerId;

      // Fetch employer (owner) details
      const owner = await this.prisma.user.findUnique({
        where: { id: ownerId },
        select: { id: true, fullName: true, email: true, profile: true },
      });

      // Find conversation that includes both job seeker and owner
      const conversation = await this.prisma.conversation.findFirst({
        where: {
          participants: {
            some: { id: userId },
          },
          AND: {
            participants: {
              some: { id: ownerId },
            },
          },
        },
        orderBy: { updatedAt: 'desc' },
      });

      return {
        companyId: company.id,
        companyName: company.name,
        ownerId: owner?.id,
        name: owner?.fullName,
        email: owner?.email,
        profile: owner?.profile,
        conversationId: conversation?.id || null,
        timestamp: conversation
          ? this.getTimeAgo(conversation.updatedAt)
          : null,
        unread: 0,
        online: false,
      };
    }),
  );

  return results;
}

}
