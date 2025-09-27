export declare class MailService {
    private transporter;
    constructor();
    sendMail(options: {
        email: string | string[];
        subject: string;
        html?: string;
        message?: string;
    }): Promise<{} | undefined>;
}
