/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateNotificationDto } from './dto/createnotification.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: DatabaseService,
    @InjectQueue('notification-queue') private notificationQueue: Queue,
  ) {}

  // Add notification to queue instead of direct DB write
  async createNotification(dto: CreateNotificationDto) {
    await this.notificationQueue.add('sendNotification', dto, {
      attempts: 3,
      removeOnComplete: true,
    });
    console.log('Notification job queued for user', dto.userId);
    return { message: 'Notification queued' };
  }

  // Get all notifications for a user
  async findAll(userId: number) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Delete a notification
  async delete(id: number) {
    const notif = await this.prisma.notification.findUnique({ where: { id } });
    if (!notif) throw new NotFoundException('Notification not found');

    return this.prisma.notification.delete({ where: { id } });
  }
}
