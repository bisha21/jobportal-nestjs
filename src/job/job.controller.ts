/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/createJob';
import * as authGuard from 'src/common/guards/auth/auth.guard';
import { SearchJobDto } from './dto/searchJob.dto';
import { ApplicationService } from 'src/application/application.service';
import { CreateApplicationDto } from 'src/application/dto/applyApplication.dto';
import { Role as Roles } from 'src/common/guards/role/role.decorator';
import { Role } from 'src/common/guards/role/role.enum';
import { RoleGuard } from 'src/common/guards/role/role.guard';
@Controller('job')
export class JobController {
  constructor(
    private readonly jobService: JobService,
    private readonly applicationService: ApplicationService,
  ) {}

  @Post()
  @UseGuards(authGuard.JwtAuthGuard, RoleGuard)
  @Roles(Role.EMPLOYEE,Role.ADMIN)
  async createJob(@Body() createJob: CreateJobDto) {
    return await this.jobService.createJob(createJob);
  }

  @Get()
  async getAllJobs(@Query() query: SearchJobDto) {
    return await this.jobService.getAllJobs(query);
  }
  @Get(':id')
  async getSingleJob(@Param('id', ParseIntPipe) id: number) {
    return await this.jobService.getSingleJob(id);
  }

  @Patch(':id')
  @UseGuards(authGuard.JwtAuthGuard, RoleGuard)
  @Roles(Role.EMPLOYEE)
  async updateJob(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateJob: CreateJobDto,
  ) {
    return await this.jobService.updateJob(id, updateJob);
  }
  @Delete(':id')
  @UseGuards(authGuard.JwtAuthGuard, RoleGuard)
  @Roles(Role.EMPLOYEE)
  async deleteJob(@Param('id', ParseIntPipe) id: number) {
    return await this.jobService.deleteJob(id);
  }
  @Post('apply/:jobId')
  @UseGuards(authGuard.JwtAuthGuard, RoleGuard)
  @Roles(Role.JOBSEEKER)
  async applyJob(
    @Param('jobId', ParseIntPipe) jobId: number,
    @Body() createApplicationDto: CreateApplicationDto,
    @Req() req: authGuard.RequestWithUser,
  ) {
    const userId = req.user.id;
    return await this.applicationService.applyJob(
      userId,
      jobId,
      createApplicationDto,
    );
  }
}
