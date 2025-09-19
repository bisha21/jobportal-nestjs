import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { MailModule } from './mail/mail.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [AuthModule, UserModule, DatabaseModule, MailModule, CompanyModule],
import { UploadModule } from './upload/upload.module';
import { CloudinaryService } from './cloudinary/cloudinary/cloudinary.service';

@Module({
  imports: [AuthModule, UserModule, DatabaseModule, MailModule, UploadModule],
  controllers: [AppController],
  providers: [AppService, CloudinaryService],
})
export class AppModule {}
