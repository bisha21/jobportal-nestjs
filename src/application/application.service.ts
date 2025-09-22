/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateApplicationDto } from './dto/applyApplication.dto';
import { UpdateApplicationDto } from './dto/updateApplication.dto';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationGateway } from 'src/notification/notification.gateway';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly notificationService: NotificationService,
    private readonly notificationGateway: NotificationGateway,
  ) {}

  async applyJob(
    userId: number,
    jobId: number,
    createApplicationDto: CreateApplicationDto,
  ) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) throw new NotFoundException('Job not found');

    // 2️⃣ Find company using job.companyId
    const company = await this.prisma.company.findUnique({
      where: { id: job.companyId },
    });

    if (!company) throw new NotFoundException('Company not found');

    // 3️⃣ Create application
    let application;
    try {
      application = await this.prisma.application.create({
        data: {
          userId,
          jobId,
          ...createApplicationDto,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('You have already applied to this job');
      }
      throw error;
    }

    // 4️⃣ Send notification to company owner
    const message = `User ${userId} applied for your job "${job.title}"`;

    // Save in DB
    await this.notificationService.createNotification({
      userId: company.ownerId, // owner gets the notification
      type: 'New Application',
      message,
    });

    // Emit real-time via socket
    this.notificationGateway.server
      .to(`user_${company.ownerId}`)
      .emit('notification:created', {
        type: 'New Application',
        message,
      });

    return application;
  }

  async getAllApplications() {
    return await this.prisma.application.findMany({
      include: {
        user: true,
        job: true,
      },
    });
  }

  async getApplicationById(applicationId: number) {
    const application = await this.prisma.application.findUnique({
      where: { id: applicationId },
      include: { user: true, job: true },
    });
    if (!application) throw new NotFoundException('Application not found');
    return application;
  }

  async updateApplication(
    applicationId: number,
    updateApplicationDto: UpdateApplicationDto,
  ) {
    // 1️⃣ Find the application
    const app = await this.prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        user: true, // To get the applicant
        job: true, // To get the job details
      },
    });

    if (!app) throw new NotFoundException('Application not found');

    // 2️⃣ Update the application
    const updatedApp = await this.prisma.application.update({
      where: { id: applicationId },
      data: updateApplicationDto,
    });

    // 3️⃣ Check if status changed to send notification
    if (
      updateApplicationDto.status &&
      (updateApplicationDto.status === 'APPROVED' ||
        updateApplicationDto.status === 'REJECTED')
    ) {
      const status = updateApplicationDto.status;
      const message = `Your application for "${app.job.title}" has been ${status.toLowerCase()}.`;

      // Save notification in DB
      await this.notificationService.createNotification({
        userId: app.userId, // applicant receives the notification
        type: 'Application Status',
        message,
      });

      // Emit real-time via WebSocket
      this.notificationGateway.server
        .to(`user_${app.userId}`)
        .emit('notification:created', { type: 'Application Status', message });
    }

    return updatedApp;
  }

  async deleteApplication(applicationId: number) {
    // Check if application exists
    const app = await this.prisma.application.findUnique({
      where: { id: applicationId },
    });
    if (!app) throw new NotFoundException('Application not found');

    return await this.prisma.application.delete({
      where: { id: applicationId },
    });
  }

  /** Get all applications by a specific user */
  async getApplicationsByUser(userId: number) {
    return await this.prisma.application.findMany({
      where: { userId },
      include: { job: true },
    });
  }

  /** Get all applications for a specific job */
  async getApplicationsByJob(jobId: number) {
    return await this.prisma.application.findMany({
      where: { jobId },
      include: { user: true },
    });
  }
}
