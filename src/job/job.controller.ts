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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Jobs')
@Controller('job')
export class JobController {
  constructor(
    private readonly jobService: JobService,
    private readonly applicationService: ApplicationService,
  ) {}

  @Post()
  @UseGuards(authGuard.JwtAuthGuard, RoleGuard)
  @Roles(Role.EMPLOYEE)
  @ApiOperation({ summary: 'Create a new job' })
  @ApiBody({ type: CreateJobDto })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Job created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createJob(@Body() createJob: CreateJobDto) {
    return await this.jobService.createJob(createJob);
  }

  @Get()
  @ApiOperation({ summary: 'Get all jobs with optional filters' })
  @ApiQuery({ type: SearchJobDto, required: false })
  @ApiResponse({ status: 200, description: 'List of jobs' })
  async getAllJobs(@Query() query: SearchJobDto) {
    return await this.jobService.getAllJobs(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single job by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Job details retrieved' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  async getSingleJob(@Param('id', ParseIntPipe) id: number) {
    return await this.jobService.getSingleJob(id);
  }

  @Patch(':id')
  @UseGuards(authGuard.JwtAuthGuard, RoleGuard)
  @Roles(Role.EMPLOYEE)
  @ApiOperation({ summary: 'Update a job by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CreateJobDto })
  @ApiBearerAuth()
  async updateJob(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateJob: CreateJobDto,
  ) {
    return await this.jobService.updateJob(id, updateJob);
  }

  @Delete(':id')
  @UseGuards(authGuard.JwtAuthGuard, RoleGuard)
  @Roles(Role.EMPLOYEE)
  @ApiOperation({ summary: 'Delete a job by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBearerAuth()
  async deleteJob(@Param('id', ParseIntPipe) id: number) {
    return await this.jobService.deleteJob(id);
  }

  @Post('apply/:jobId')
  @UseGuards(authGuard.JwtAuthGuard, RoleGuard)
  @Roles(Role.JOBSEEKER)
  @ApiOperation({ summary: 'Apply to a job' })
  @ApiParam({ name: 'jobId', type: Number })
  @ApiBody({ type: CreateApplicationDto })
  @ApiBearerAuth()
  async applyJob(
    @Param('jobId', ParseIntPipe) jobId: number,
    @Body() createApplicationDto: CreateApplicationDto,
    @Req() req: authGuard.RequestWithUser,
  ) {
    const userId = req.user.id;
    return await this.applicationService.applyJob(
      jobId,
      userId,
      createApplicationDto,
    );
  }
}
