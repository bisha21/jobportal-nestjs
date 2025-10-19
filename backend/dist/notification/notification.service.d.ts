import { DatabaseService } from 'src/database/database.service';
import { CreateNotificationDto } from './dto/createnotification.dto';
import { Queue } from 'bullmq';
export declare class NotificationService {
    private readonly prisma;
    private notificationQueue;
    constructor(prisma: DatabaseService, notificationQueue: Queue);
    createNotification(dto: CreateNotificationDto): Promise<{
        message: string;
    }>;
    findAll(userId: number): Promise<{
        type: string | null;
        userId: number;
        message: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    delete(id: number): Promise<{
        type: string | null;
        userId: number;
        message: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
