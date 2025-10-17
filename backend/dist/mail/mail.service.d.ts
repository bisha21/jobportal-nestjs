import { Queue } from 'bullmq';
export declare class MailService {
    private mailQueue;
    constructor(mailQueue: Queue);
    sendMail(options: {
        email: string | string[];
        subject: string;
        html?: string;
        message?: string;
    }): Promise<void>;
}
