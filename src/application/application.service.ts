/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateApplicationDto } from './dto/applyApplication.dto';
import { UpdateApplicationDto } from './dto/updateApplication.dto';

@Injectable()
export class ApplicationService {
  constructor(private readonly prisma: DatabaseService) {}

  async applyJob(
    userId: number,
    jobId: number,
    createApplicationDto: CreateApplicationDto,
  ) {
    const job = await this.prisma.job.findUnique({ where: { id: jobId } });
    if (!job) throw new NotFoundException('Job not found');

    try {
      return await this.prisma.application.create({
        data: {
          userId,
          jobId,
          ...createApplicationDto,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        // Prisma unique constraint error
        throw new ConflictException('You have already applied to this job');
      }
      throw error;
    }
  }

  async getAllApplications() {
    return await this.prisma.application.findMany({
      include: {
        user: true,
        job: true,
      },
    });
  }

  async getApplicationById(applicationId: number) {
    const application = await this.prisma.application.findUnique({
      where: { id: applicationId },
      include: { user: true, job: true },
    });
    if (!application) throw new NotFoundException('Application not found');
    return application;
  }

  async updateApplication(
    applicationId: number,
    updateApplicationDto: UpdateApplicationDto,
  ) {
    // Check if application exists
    const app = await this.prisma.application.findUnique({
      where: { id: applicationId },
    });
    if (!app) throw new NotFoundException('Application not found');

    return await this.prisma.application.update({
      where: { id: applicationId },
      data: updateApplicationDto,
    });
  }

  async deleteApplication(applicationId: number) {
    // Check if application exists
    const app = await this.prisma.application.findUnique({
      where: { id: applicationId },
    });
    if (!app) throw new NotFoundException('Application not found');

    return await this.prisma.application.delete({
      where: { id: applicationId },
    });
  }

  /** Get all applications by a specific user */
  async getApplicationsByUser(userId: number) {
    return await this.prisma.application.findMany({
      where: { userId },
      include: { job: true },
    });
  }

  /** Get all applications for a specific job */
  async getApplicationsByJob(jobId: number) {
    return await this.prisma.application.findMany({
      where: { jobId },
      include: { user: true },
    });
  }
}
