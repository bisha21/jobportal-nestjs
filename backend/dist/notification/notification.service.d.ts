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
        message: string;
        type: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }[]>;
    delete(id: number): Promise<{
        message: string;
        type: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
}
