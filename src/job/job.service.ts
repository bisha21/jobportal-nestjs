/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateJobDto } from './dto/createJob';
import { updateJobDto } from './dto/updateJob';
import { DatabaseService } from 'src/database/database.service';
import { ApiFeaturesPrisma } from 'src/utils/apiFeatures';
import { Prisma } from 'generated/prisma';
import { SearchJobDto } from './dto/searchJob.dto';

@Injectable()
export class JobService {
  private readonly logger = new Logger(JobService.name);

  constructor(private prisma: DatabaseService) {}

  async createJob(createJobDto: CreateJobDto) {
    const company = await this.prisma.company.findUnique({
      where: { id: createJobDto.companyId },
    });
    if (!company) {
      this.logger.warn(
        `Attempted to create job for non-existent company ID ${createJobDto.companyId}`,
      );
      throw new NotFoundException('Company not found');
    }

    const job = await this.prisma.job.create({ data: createJobDto });
    this.logger.log(`Job created with ID ${job.id}`);
    return job;
  }

  async getAllJobs(query: SearchJobDto) {
    const features = new ApiFeaturesPrisma(query)
      .filter()
      .sort()
      .paginate()
      .limitFields()
      .includeRelations();

      const options= features.getOptions() as Prisma.JobFindManyArgs;
    const jobs = await this.prisma.job.findMany(options);
    this.logger.log(`Fetched ${jobs.length} jobs`);
    return jobs;
  }

  async getSingleJob(jobId: number) {
    const job = await this.prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      this.logger.warn(`Job not found with ID ${jobId}`);
      throw new NotFoundException(`Job with ID ${jobId} not found`);
    }
    this.logger.log(`Fetched job with ID ${jobId}`);
    return job;
  }

  async updateJob(jobId: number, updateJobDto: updateJobDto) {
    const updatedJob = await this.prisma.job.update({
      where: { id: jobId },
      data: updateJobDto,
    });
    this.logger.log(`Updated job with ID ${jobId}`);
    return updatedJob;
  }

  async deleteJob(jobId: number) {
    const deletedJob = await this.prisma.job.delete({ where: { id: jobId } });
    this.logger.log(`Deleted job with ID ${jobId}`);
    return deletedJob;
  }
}
