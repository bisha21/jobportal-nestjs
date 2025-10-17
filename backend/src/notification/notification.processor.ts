/* eslint-disable prettier/prettier */
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { DatabaseService } from 'src/database/database.service';
import { NotificationGateway } from './notification.gateway';
import { Injectable } from '@nestjs/common';

@Processor('notification-queue')
@Injectable()
export class NotificationProcessor extends WorkerHost {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly gateway: NotificationGateway,
  ) {
    super();
  }

  // This will run whenever a job named "sendNotification" is added to the queue
  async process(job: Job) {
    const data = job.data; 
    const { userId, type, message } = data;

    const notification = await this.prisma.notification.create({
      data: {
        userId,
        type,
        message,
      },
    });

    if (this.gateway?.server) {
      this.gateway.server
        .to(`user_${userId}`)
        .emit('notification:created', notification);
      console.log(`✅ Notification sent to user ${userId}`);
    }

    return notification; 
  }
}
