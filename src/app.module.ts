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
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryService],
})
export class AppModule {}
