/* eslint-disable prettier/prettier */
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class MailService {
  constructor(@InjectQueue('mail-queue') private mailQueue: Queue) {}

  async sendMail(options: {
    email: string | string[];
    subject: string;
    html?: string;
    message?: string;
  }) {
    if (
      !options.email ||
      (Array.isArray(options.email) && options.email.length === 0)
    ) {
      console.error('Email is required');
      return;
    }

    await this.mailQueue.add('sendMail', options, {
      attempts: 3,
      removeOnComplete: true,
    });

    console.log(' Mail job added to the queue');
  }
}
