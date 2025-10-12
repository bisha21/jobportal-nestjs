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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/createJob';
import * as authGuard from 'src/common/guards/auth/auth.guard';
import { SearchJobDto } from './dto/searchJob.dto';
import { ApplicationService } from 'src/application/application.service';
import { CreateApplicationDto } from 'src/application/dto/applyApplication.dto';
import { Role as Roles } from 'src/common/guards/role/role.decorator';
import { Role } from 'src/common/guards/role/role.enum';
import { RoleGuard } from 'src/common/guards/role/role.guard';
import { updateJobDto } from './dto/updateJob';

@ApiTags('Jobs')
@ApiBearerAuth()
@Controller('job')
export class JobController {
  constructor(
    private readonly jobService: JobService,
    private readonly applicationService: ApplicationService,
  ) {}

  // ------------------- Create Job -------------------
  @Post()
  @UseGuards(authGuard.JwtAuthGuard, RoleGuard)
  @Roles(Role.EMPLOYEE, Role.ADMIN)
  @ApiOperation({ summary: 'Create a new job' })
  @ApiResponse({ status: 201, description: 'Job created successfully' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. You do not have permission',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid or missing JWT token',
  })
  async createJob(@Body() createJob: CreateJobDto) {
    return await this.jobService.createJob(createJob);
  }

  // ------------------- Get All Jobs -------------------
  @Get()
  @ApiOperation({ summary: 'Get all jobs with optional filters' })
  @ApiResponse({ status: 200, description: 'Jobs retrieved successfully' })
  async getAllJobs(@Query() query: SearchJobDto) {
    return await this.jobService.getAllJobs(query);
  }

  // ------------------- Get Single Job -------------------
  @Get(':id')
  @ApiOperation({ summary: 'Get a single job by ID' })
  @ApiResponse({ status: 200, description: 'Job retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  async getSingleJob(@Param('id', ParseIntPipe) id: number) {
    return await this.jobService.getSingleJob(id);
  }

  // ------------------- Update Job -------------------
  @Patch(':id')
  @UseGuards(authGuard.JwtAuthGuard, RoleGuard)
  @Roles(Role.EMPLOYEE, Role.ADMIN)
  @ApiOperation({ summary: 'Update a job by ID' })
  @ApiResponse({ status: 200, description: 'Job updated successfully' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. You do not have permission',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid or missing JWT token',
  })
  @ApiResponse({ status: 404, description: 'Job not found' })
  async updateJob(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateJob: updateJobDto,
  ) {
    return await this.jobService.updateJob(id, updateJob);
  }

  // ------------------- Delete Job -------------------
  @Delete(':id')
  @UseGuards(authGuard.JwtAuthGuard, RoleGuard)
  @Roles(Role.EMPLOYEE, Role.ADMIN)
  @ApiOperation({ summary: 'Delete a job by ID' })
  @ApiResponse({ status: 200, description: 'Job deleted successfully' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. You do not have permission',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid or missing JWT token',
  })
  @ApiResponse({ status: 404, description: 'Job not found' })
  async deleteJob(@Param('id', ParseIntPipe) id: number) {
    return await this.jobService.deleteJob(id);
  }

  // ------------------- Apply to Job -------------------
  @Post('apply/:jobId')
  @UseGuards(authGuard.JwtAuthGuard, RoleGuard)
  @Roles(Role.JOBSEEKER, Role.ADMIN)
  @ApiOperation({ summary: 'Apply to a job by job ID' })
  @ApiResponse({
    status: 201,
    description: 'Application submitted successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. You do not have permission',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid or missing JWT token',
  })
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
