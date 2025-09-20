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
  UseGuards,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/createJob';
import { JwtAuthGuard } from 'src/common/guards/auth/auth.guard';
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createJob(@Body() createJob: CreateJobDto) {
    return await this.jobService.createJob(createJob);
  }

  @Get()
  async getAllJobs() {
    return await this.jobService.getAllJobs();
  }
  @Get(':id')
  async getSingleJob(@Param('id', ParseIntPipe) id: number) {
    return await this.jobService.getSingleJob(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateJob(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateJob: CreateJobDto,
  ) {
    return await this.jobService.updateJob(id, updateJob);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteJob(@Param('id', ParseIntPipe) id: number) {
    return await this.jobService.deleteJob(id);
  }
}
