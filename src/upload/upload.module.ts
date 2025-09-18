import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary/cloudinary.service';
import { AuthService } from 'src/auth/auth.service';
import { DatabaseModule } from 'src/database/database.module'; // import prisma provider
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [DatabaseModule, JwtModule, MailModule],
  controllers: [UploadController],
  providers: [CloudinaryService, AuthService],
})
export class UploadModule {}
