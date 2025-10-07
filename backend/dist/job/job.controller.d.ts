import { JobService } from './job.service';
import { CreateJobDto } from './dto/createJob';
import * as authGuard from 'src/common/guards/auth/auth.guard';
import { SearchJobDto } from './dto/searchJob.dto';
import { ApplicationService } from 'src/application/application.service';
import { CreateApplicationDto } from 'src/application/dto/applyApplication.dto';
import { updateJobDto } from './dto/updateJob';
export declare class JobController {
    private readonly jobService;
    private readonly applicationService;
    constructor(jobService: JobService, applicationService: ApplicationService);
    createJob(createJob: CreateJobDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        position: string;
        location: string | null;
        experience: string;
        salaryMin: number;
        salaryMax: number;
        type: import("generated/prisma").$Enums.JobType;
        deadline: Date | null;
        companyId: number;
        categoryId: number;
    }>;
    getAllJobs(query: SearchJobDto): Promise<({
        company: {
            id: number;
            name: string;
            logoUrl: string | null;
        };
        category: {
            id: number;
            categoryName: string;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        position: string;
        location: string | null;
        experience: string;
        salaryMin: number;
        salaryMax: number;
        type: import("generated/prisma").$Enums.JobType;
        deadline: Date | null;
        companyId: number;
        categoryId: number;
    })[]>;
    getSingleJob(id: number): Promise<{
        company: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string;
            location: string;
            website: string | null;
            industry: string;
            companySize: string;
            logoUrl: string | null;
            ownerId: number;
        };
        category: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            categoryName: string;
            userId: number;
        };
        jobSkills: {
            skill: string;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        position: string;
        location: string | null;
        experience: string;
        salaryMin: number;
        salaryMax: number;
        type: import("generated/prisma").$Enums.JobType;
        deadline: Date | null;
        companyId: number;
        categoryId: number;
    }>;
    updateJob(id: number, updateJob: updateJobDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        position: string;
        location: string | null;
        experience: string;
        salaryMin: number;
        salaryMax: number;
        type: import("generated/prisma").$Enums.JobType;
        deadline: Date | null;
        companyId: number;
        categoryId: number;
    }>;
    deleteJob(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        position: string;
        location: string | null;
        experience: string;
        salaryMin: number;
        salaryMax: number;
        type: import("generated/prisma").$Enums.JobType;
        deadline: Date | null;
        companyId: number;
        categoryId: number;
    }>;
    applyJob(jobId: number, createApplicationDto: CreateApplicationDto, req: authGuard.RequestWithUser): Promise<any>;
}
