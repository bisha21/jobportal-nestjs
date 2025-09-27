/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // smtp-relay.brevo.com
      port: parseInt(process.env.MAIL_PORT as string, 10), // 2525
      secure: false, // false for TLS (STARTTLS), true for SSL (465)
      auth: {
        user: process.env.MAIL_USERNAME, // 91ba70001@smtp-brevo.com
        pass: process.env.MAIL_PASSWORD, // your SMTP key
      },
      tls: {
        rejectUnauthorized: false, // helps if Brevo TLS handshake fails
      },
    });
  }

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

    const recipients = Array.isArray(options.email)
      ? options.email.join(',')
      : options.email;

    const mailOptions = {
      from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`, // "XAV <timilsinab22bi@gmail.com>"
      to: recipients,
      subject: options.subject,
      html: options.html,
      text: options.message,
    };

    return await this.transporter.sendMail(mailOptions) as {};
  }
}
