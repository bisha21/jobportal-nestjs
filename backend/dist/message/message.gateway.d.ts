import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/createMessage.dto';
import { JwtService } from '@nestjs/jwt';
interface AuthenticatedSocket extends Socket {
    user?: {
        id: number;
        email: string;
    };
}
export declare class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly messageService;
    private readonly jwtService;
    server: Server;
    constructor(messageService: MessageService, jwtService: JwtService);
    handleConnection(client: AuthenticatedSocket): void;
    handleDisconnect(client: AuthenticatedSocket): void;
    sendMessage(createMessageDto: CreateMessageDto, client: AuthenticatedSocket): Promise<{
        status: string;
        message: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            receiverId: number;
            conversationId: number;
            read: boolean;
            senderId: number;
        };
    } | undefined>;
    joinConversationRoom(conversationId: number, client: AuthenticatedSocket): Promise<void>;
}
export {};
