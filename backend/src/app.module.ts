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
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryService],
})
export class AppModule {}
