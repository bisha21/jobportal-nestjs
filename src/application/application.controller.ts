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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Applications')
@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all job applications' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'List of all applications' })
  async getAllApplications() {
    return await this.applicationService.getAllApplications();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get single application by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Application retrieved' })
  @ApiResponse({ status: 404, description: 'Application not found' })
  async getApplicationById(@Param('id', ParseIntPipe) id: number) {
    return await this.applicationService.getApplicationById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update an application' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateApplicationDto })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Application updated successfully' })
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
  @ApiOperation({ summary: 'Delete an application by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Application deleted successfully' })
  async deleteApplication(@Param('id', ParseIntPipe) id: number) {
    return await this.applicationService.deleteApplication(id);
  }

  @Get('user/me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all applications of the logged-in user' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'List of user applications' })
  async getMyApplications(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    return await this.applicationService.getApplicationsByUser(userId);
  }
}
