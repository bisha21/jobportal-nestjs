/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { JwtModule } from '@nestjs/jwt';
import JwtConstants from 'src/config/jwt.config';
import { NotificationGateway } from './notification.gateway';
import { DatabaseModule } from 'src/database/database.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: JwtConstants.secret,
      signOptions: { expiresIn: JwtConstants.expiresIn },
    }),
    BullModule.registerQueue({
      name: 'notification-queue',
    })
  ],
  providers: [NotificationService, NotificationGateway],
  controllers: [NotificationController],
  exports: [NotificationService, NotificationGateway],
})
export class NotificationModule {}
