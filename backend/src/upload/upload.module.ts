import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary/cloudinary.service';
import { AuthService } from 'src/auth/auth.service';
import { DatabaseModule } from 'src/database/database.module'; // import prisma provider
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';
import JwtConstants from 'src/config/jwt.config';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [
    DatabaseModule,
    MailModule,
    CompanyModule,
    JwtModule.register({
      secret: JwtConstants.secret,
      signOptions: { expiresIn: JwtConstants.expiresIn },
    }),
  ],
  controllers: [UploadController],
  providers: [CloudinaryService, AuthService],
})
export class UploadModule {}
