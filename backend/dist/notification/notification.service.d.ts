import { DatabaseService } from 'src/database/database.service';
import { CreateNotificationDto } from './dto/createnotification.dto';
export declare class NotificationService {
    private readonly prisma;
    constructor(prisma: DatabaseService);
    createNotification(createNotificationDto: CreateNotificationDto): Promise<{
        message: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: string | null;
        userId: number;
    }>;
    findAll(userId: number): Promise<{
        message: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: string | null;
        userId: number;
    }[]>;
    delete(id: number): Promise<{
        message: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: string | null;
        userId: number;
    }>;
}
