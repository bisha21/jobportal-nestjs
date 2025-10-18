/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { MailModule } from './mail/mail.module';
import { CompanyModule } from './company/company.module';
import { CloudinaryService } from './cloudinary/cloudinary/cloudinary.service';
import { UploadModule } from './upload/upload.module';
import { JobModule } from './job/job.module';
import { ApplicationModule } from './application/application.module';
import { JobskillModule } from './jobskill/jobskill.module';
import { UserskillModule } from './userskill/userskill.module';
import { NotificationModule } from './notification/notification.module';
import { MessageModule } from './message/message.module';
import { FavoriteModule } from './favorite/favorite.module';
import { CategoryModule } from './category/category.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { RedisModule } from './redis/redis.module';
import { BullModule } from '@nestjs/bullmq';
import { APP_GUARD } from '@nestjs/core';
import { redisConfigConstant } from './config/redis.config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'; // <-- Import ThrottlerGuard

@Module({
  imports: [
    AuthModule,
    UserModule,
    DatabaseModule,
    MailModule,
    UploadModule,
    CompanyModule,
    JobModule,
    ApplicationModule,
    JobskillModule,
    UserskillModule,
    NotificationModule,
    MessageModule,
    FavoriteModule,
    CategoryModule,
    DashboardModule,
    RedisModule,
    BullModule.forRoot({
      connection: {
        host: redisConfigConstant.host,
        port: redisConfigConstant.port,
        password: redisConfigConstant.password,
      },
      defaultJobOptions: {
        attempts: 3,
        removeOnComplete: 1000,
        removeOnFail: 1000,
      },
    }),

    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,
          limit: 10,
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CloudinaryService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
