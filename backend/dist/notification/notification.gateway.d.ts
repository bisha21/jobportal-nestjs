import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/createnotification.dto';
export declare class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly notificationService;
    server: Server;
    private users;
    constructor(notificationService: NotificationService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    joinUserRoom(userId: number, client: Socket): Promise<void>;
    createNotification(payload: CreateNotificationDto): Promise<{
        success: boolean;
        data: {
            message: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            type: string | null;
            userId: number;
        };
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        data?: undefined;
    }>;
    readNotification(userId: number): Promise<{
        success: boolean;
        data: {
            message: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            type: string | null;
            userId: number;
        }[];
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        data?: undefined;
    }>;
}
