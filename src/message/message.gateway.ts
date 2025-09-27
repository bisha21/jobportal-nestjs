/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/createMessage.dto';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

// Extend Socket to include our user
interface AuthenticatedSocket extends Socket {
  user?: { id: number; email: string }; // you can add more fields if needed
}

@WebSocketGateway({
  cors: {
    origin: '*', // allow all origins for dev
  },
})
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly messageService: MessageService,
    private readonly jwtService: JwtService,
  ) {}

   handleConnection(client: AuthenticatedSocket) {
    try {
      const token =
         (client.handshake.query?.token as string) ||
        client.handshake.auth?.token ||
        client.handshake.headers.authorization;

      if (!token) throw new UnauthorizedException('No token provided');

      const jwt =  token.replace('Bearer ', '');
      const payload = this.jwtService.verify(jwt as string);

      client.user = { id: payload.sub, email: payload.email };
      console.log(
        `✅ User ${client.user.id} connected via socket ${client.id}`,
      );
    } catch (err) {
      console.error('❌ Socket connection failed:', err.message);
      client.disconnect(true);
    }
  }

  handleDisconnect(client: AuthenticatedSocket) {
    console.log(
      `❌ User ${client.user?.id || 'Unknown'} disconnected: ${client.id}`,
    );
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    try {
      if (!client.user)
        throw new UnauthorizedException('User not authenticated');

      const message = await this.messageService.sendMessage(
        createMessageDto,
        client.user.id,
      );

      // Emit only to the conversation room
      this.server
        .to(`conversation_${createMessageDto.conversationId}`)
        .emit('newMessage', message);

      return { status: 'ok', message };
    } catch (err) {
      console.error('❌ Error sending message:', err.message);
      client.emit('errorMessage', { error: err.message });
    }
  }

  @SubscribeMessage('joinConversationRoom')
  async joinConversationRoom(
    @MessageBody() conversationId: number,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    try {
      if (!client.user)
        throw new UnauthorizedException('User not authenticated');

      await client.join(`conversation_${conversationId}`);
      console.log(
        `✅ User ${client.user.id} joined conversation_${conversationId}`,
      );

      client.emit('joinedRoom', { conversationId });
    } catch (err) {
      console.error('❌ Error joining room:', err.message);
      client.emit('errorMessage', { error: err.message });
    }
  }
}
