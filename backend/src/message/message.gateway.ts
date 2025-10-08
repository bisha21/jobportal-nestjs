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

interface AuthenticatedSocket extends Socket {
  user?: { id: number; email: string };
}

@WebSocketGateway({
  cors: { origin: '*' },
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
    console.log('🔹 New connection attempt:', {
      // clientId: client,
      handshakeAuth: client.handshake,
      handshakeQuery: client.handshake.query,
      handshakeHeaders: client.handshake.headers,
    });

    try {
      const tokenRaw =
        (client.handshake.auth?.token as string) ||
        client.handshake.query?.token ||
        client.handshake.headers.authorization;

      if (!tokenRaw) throw new UnauthorizedException('No token provided');

      const tokenString = Array.isArray(tokenRaw) ? tokenRaw[0] : tokenRaw;
      const token = tokenString.replace(/^Bearer\s/, '');

      const payload = this.jwtService.verify(token);

      client.user = { id: payload.userId, email: payload.email }; // <-- FIXED
      console.log(
        `✅ User ${client.user.id} connected via socket ${client.id}`,
      );
    } catch (err) {
      console.error('❌ Socket connection failed:', err.message);
      client.disconnect(true);
    }
  }

  handleDisconnect(client: AuthenticatedSocket) {
    console.log('hahahaha', client);
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    console.log('🔹 sendMessage called with payload:', createMessageDto);
    console.log('🔹 User sending message:', client.user);

    try {
      if (!client.user)
        throw new UnauthorizedException('User not authenticated');

      const message = await this.messageService.sendMessage(
        createMessageDto,
        client.user.id,
      );

      console.log('✅ Message created:', message);

      this.server
        .to(`conversation_${createMessageDto.conversationId}`)
        .emit('newMessage', message);

      console.log(
        `📤 Message emitted to conversation_${createMessageDto.conversationId}`,
      );

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
    console.log('🔹 joinConversationRoom called with:', conversationId);
    console.log('🔹 User joining room:', client.user);

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
