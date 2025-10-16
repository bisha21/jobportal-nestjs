/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateJobDto } from './dto/createJob';
import { updateJobDto } from './dto/updateJob';
import { DatabaseService } from 'src/database/database.service';
import { ApiFeaturesPrisma } from 'src/utils/apiFeatures';
import { SearchJobDto } from './dto/searchJob.dto';
import { Prisma } from '../../generated/prisma';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class JobService {
  private readonly logger = new Logger(JobService.name);

  constructor(private prisma: DatabaseService,
    private redis: RedisService
  ) {}

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
    try {
      // Generate a unique cache key based on the query
      const cacheKey = `jobs:${JSON.stringify(query)}`;

      // Check Redis cache first
      const cachedJobs = await this.redis.get(cacheKey);
      if (cachedJobs) {
        return JSON.parse(cachedJobs) as Awaited<
          ReturnType<typeof this.prisma.job.findMany>
        >;
      }

      // Build Prisma options using ApiFeatures
      const features = new ApiFeaturesPrisma(query)
        .filter()
        .sort()
        .paginate()
        .limitFields()
        .includeRelations();

      const options = features.getOptions() as Prisma.JobFindManyArgs;

      // Build dynamic where clause
      const where: Prisma.JobWhereInput = {};
      if (query.title)
        where.title = { contains: query.title, mode: 'insensitive' };
      if (query.location)
        where.location = { contains: query.location, mode: 'insensitive' };
      if (query.jobType) where.type = query.jobType as any;
      if (query.companyId) where.companyId = query.companyId;
      if (query.categoryId) where.categoryId = query.categoryId;
      if (query.salaryMin && query.salaryMax) {
        where.AND = [
          { salaryMin: { lte: query.salaryMax } },
          { salaryMax: { gte: query.salaryMin } },
        ];
      }
      if (query.ownerId) {
        where.company = { ownerId: query.ownerId };
      }

      // Fetch jobs from Prisma
      const jobs = await this.prisma.job.findMany({
        ...options,
        where,
        include: {
          category: { select: { id: true, categoryName: true } },
          company: {
            select: { id: true, name: true, logoUrl: true, ownerId: true },
          },
        },
      });

      // Save jobs to Redis cache for 10 minutes (600 seconds)
      await this.redis.set(cacheKey, JSON.stringify(jobs), 600);

      this.logger.log(`Fetched ${jobs.length} jobs`);
      return jobs;
    } catch (error) {
      this.logger.error('getAllJobs error:', error);
      throw new InternalServerErrorException('Failed to fetch jobs');
    }
  }

  async getSingleJob(jobId: number) {
    const cachedJob = await this.redis.get(`job:${jobId}`);
    if (cachedJob) {
      console.log('Cache hit! hahahahahahahah');
      return JSON.parse(cachedJob) as Awaited<
        ReturnType<typeof this.prisma.job.findUnique>
      >;
    }
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
      include: {
        jobSkills: {
          select: {
            skill: true,
          },
        },
        company: true,
        category: true,
      },
    });
    if (!job) {
      this.logger.warn(`Job not found with ID ${jobId}`);
      throw new NotFoundException(`Job with ID ${jobId} not found`);
    }
    this.logger.log(`Fetched job with ID ${jobId}`);
    await this.redis.set(`job:${jobId}`, JSON.stringify(job), 600);
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
