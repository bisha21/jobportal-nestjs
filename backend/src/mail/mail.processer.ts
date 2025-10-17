/* eslint-disable prettier/prettier */
import { Processor, WorkerHost } from '@nestjs/bullmq';
import * as nodemailer from 'nodemailer';

@Processor('mail-queue')
export class MailProcessor extends WorkerHost {
  private transporter;

  constructor() {
    super();
    // Configure Nodemailer once
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT as string, 10),
      secure: false,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  // This runs whenever a job named "sendMail" is added
  async process(job) {
    const { email, subject, html, message } = job.data;

    const recipients = Array.isArray(email) ? email.join(',') : email;

    const mailOptions = {
      from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
      to: recipients,
      subject,
      html,
      text: message,
    };

    console.log(`📧 Sending email to: ${recipients}`);
    const result = await this.transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully: ${result.messageId}`);

    return result;
  }
}
