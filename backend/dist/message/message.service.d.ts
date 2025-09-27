import { DatabaseService } from 'src/database/database.service';
import { CreateConversationDto } from './dto/createConversation.dto';
import { CreateMessageDto } from './dto/createMessage.dto';
export declare class MessageService {
    private readonly prisma;
    constructor(prisma: DatabaseService);
    createConversation(createConversationDto: CreateConversationDto, userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jobId: number | null;
        participants: {
            fullName: string;
            email: string;
            profile: string | null;
            phoneNumber: string;
            id: number;
            role: import("generated/prisma").$Enums.Role;
        }[];
        messages: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            receiverId: number;
            read: boolean;
            senderId: number;
        }[];
    }>;
    sendMessage(createMessageDto: CreateMessageDto, userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        receiverId: number;
        conversationId: number;
        read: boolean;
        senderId: number;
    }>;
    getAllMessageByConversation(conversationId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        receiverId: number;
        read: boolean;
        senderId: number;
    }[]>;
}
