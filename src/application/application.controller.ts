/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { UpdateApplicationDto } from './dto/updateApplication.dto';
import {
  JwtAuthGuard,
 type RequestWithUser,
} from 'src/common/guards/auth/auth.guard';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}


  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllApplications() {
    return await this.applicationService.getAllApplications();
  }

  /** Get single application by ID */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getApplicationById(@Param('id', ParseIntPipe) id: number) {
    return await this.applicationService.getApplicationById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateApplication(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    return await this.applicationService.updateApplication(
      id,
      updateApplicationDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteApplication(@Param('id', ParseIntPipe) id: number) {
    return await this.applicationService.deleteApplication(id);
  }

  @Get('user/me')
  @UseGuards(JwtAuthGuard)
  async getMyApplications(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    return await this.applicationService.getApplicationsByUser(userId);
  }
}
