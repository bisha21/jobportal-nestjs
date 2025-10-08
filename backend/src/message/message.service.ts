/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateConversationDto } from './dto/createConversation.dto';
import { CreateMessageDto } from './dto/createMessage.dto';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: DatabaseService) {}

  /**
   * Create a conversation for a job with participants
   */
  async createConversation(
    createConversationDto: CreateConversationDto,
    userId: number,
  ) {
    const { jobId, participants } = createConversationDto;

    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
      include: { company: true },
    });
    if (!job) throw new NotFoundException('Job not found');

    const employeeId = job.company.ownerId;

    // Check if conversation already exists
    let conversation = await this.prisma.conversation.findFirst({
      where: {
        jobId,
        participants: { some: { id: userId } },
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
      const participantIds = [employeeId, userId, ...(participants || [])];
      const uniqueParticipantIds = [...new Set(participantIds)];

      conversation = await this.prisma.conversation.create({
        data: {
          jobId,
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

  /**
   * Send a message in an existing conversation
   */
  async sendMessage(createMessageDto: CreateMessageDto, userId: number) {
    const { receiverId, conversationId, content } = createMessageDto;

    if (!receiverId || !conversationId) {
      throw new NotFoundException('receiverId or conversationId missing');
    }

    const conversationExists = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversationExists) {
      throw new NotFoundException('Conversation not found');
    }

    const message = await this.prisma.message.create({
      data: {
        senderId: userId,
        receiverId,
        conversationId,
        content,
      },
    });

    return message;
  }

  /**
   * Get all messages of a conversation
   */
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
      orderBy: { createdAt: 'asc' }, // chronological order
    });

    return messages;
  }
}
