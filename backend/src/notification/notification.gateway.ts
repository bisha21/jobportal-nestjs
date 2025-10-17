/* eslint-disable prettier/prettier */
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
  cors: { origin: '*' }, // allow all origins
})
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly notificationService: NotificationService) {}

  // Track connected clients (optional)
  private users = new Map<number, string>(); // userId => socket.id

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // User joins their personal socket room
  @SubscribeMessage('JoinUserRoom')
  async joinUserRoom(
    @MessageBody() userId: number,
    @ConnectedSocket() client: Socket,
  ) {
    await client.join(`user_${userId}`);
    this.users.set(userId, client.id);
    console.log(`User ${userId} joined room user_${userId}`);
  }

  // Add a notification job to the queue
  @SubscribeMessage('notification:create')
  async createNotification(@MessageBody() payload: CreateNotificationDto) {
    try {
      const dto = typeof payload === 'string' ? JSON.parse(payload) : payload;

      // Add job to BullMQ queue instead of direct DB call
      await this.notificationService.createNotification(dto);

      return { success: true, message: 'Notification queued' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  // Read notifications for a user (direct DB read is okay)
  @SubscribeMessage('notification:read')
  async readNotification(@MessageBody() userId: number) {
    try {
      const notifications = await this.notificationService.findAll(userId);
      return { success: true, data: notifications };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
}
