import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/createnotification.dto';
export declare class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly notificationService;
    server: Server;
    constructor(notificationService: NotificationService);
    private users;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    joinUserRoom(userId: number, client: Socket): Promise<void>;
    createNotification(payload: CreateNotificationDto): Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message?: undefined;
    }>;
    readNotification(userId: number): Promise<{
        success: boolean;
        data: {
            type: string | null;
            message: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
        }[];
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        data?: undefined;
    }>;
}
