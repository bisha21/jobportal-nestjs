/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
  BadRequestException,
  ParseIntPipe,
  Param,
  Patch
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multer from 'multer';
import { AuthService } from 'src/auth/auth.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary/cloudinary.service';
import {
  JwtAuthGuard,
  type RequestWithUser,
} from 'src/common/guards/auth/auth.guard';
import { CompanyService } from 'src/company/company.service';

const storage = multer.memoryStorage(); // store files in memory buffer

@Controller('upload')
export class UploadController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly authService: AuthService,
    private readonly companyService: CompanyService,
  ) {}

  @Post('profile')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('profilePicture', {
      storage,
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return cb(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadProfilePicture(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: RequestWithUser,
  ) {
    const imageUrl = await this.cloudinaryService.uploadFile(file);
    await this.authService.updateProfilePicture(req.user.id, imageUrl);
    return { message: 'Profile picture uploaded', url: imageUrl };
  }

  @Patch('logo/:companyId')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('companyLogo', {
      storage,
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return cb(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadCompanyLogo(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: RequestWithUser,
    @Param('companyId', ParseIntPipe) companyId: number,
  ) {
    const logoUrl = await this.cloudinaryService.uploadFile(file);
    await this.companyService.updateCompanyLogo(companyId, logoUrl);
    return { message: 'Company logo uploaded', url: logoUrl };
  }
}
