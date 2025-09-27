export declare class CreateMessageDto {
    receiverId: number;
    conversationId: number;
    content: string;
    read?: boolean;
}
export declare class UpdateMessageDto {
    content?: string;
    read?: boolean;
}
