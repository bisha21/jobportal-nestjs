/* eslint-disable prettier/prettier */
// src/notifications/notification.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/createnotification.dto';

@WebSocketGateway({
  cors: {
    origin: '*', // allow all origins for dev
  },
})
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  // Map to store connected users
  private users = new Map<string, string>(); // userId => socket.id

  constructor(private readonly notificationService: NotificationService) {}

  // Handle new connection
  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  // Handle disconnection
  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }
  @SubscribeMessage('JoinUserroom')
  async joinUserRoom(
    @MessageBody() userId: number,
    @ConnectedSocket() client: Socket,
  ) {
    await client.join(`user_${userId}`);
    console.log(`User ${userId} joined socket room`);
  }
  @SubscribeMessage('notification:create')
  async createNotification(@MessageBody() payload: CreateNotificationDto) {
    try {
      // If payload is string, parse it
      const dto = typeof payload === 'string' ? JSON.parse(payload) : payload;

      const notification =
        await this.notificationService.createNotification(dto);

      // Emit event to the user room
      this.server
        .to(`user_${dto.userId}`)
        .emit('notification:created', notification);

      return { success: true, data: notification };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  @SubscribeMessage('notification:read')
  async readNotification(userId: number) {
    try {
      const notifications = await this.notificationService.findAll(userId);
      return { success: true, data: notifications };
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return { success: false, error: err.message };
    }
  }
}
