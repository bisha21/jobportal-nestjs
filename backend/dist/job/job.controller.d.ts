import { JobService } from './job.service';
import { CreateJobDto } from './dto/createJob';
import * as authGuard from 'src/common/guards/auth/auth.guard';
import { SearchJobDto } from './dto/searchJob.dto';
import { ApplicationService } from 'src/application/application.service';
import { CreateApplicationDto } from 'src/application/dto/applyApplication.dto';
export declare class JobController {
    private readonly jobService;
    private readonly applicationService;
    constructor(jobService: JobService, applicationService: ApplicationService);
    createJob(createJob: CreateJobDto): Promise<{
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
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllJobs(query: SearchJobDto): Promise<{
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
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getSingleJob(id: number): Promise<{
        applications: ({
            user: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                role: import("generated/prisma").$Enums.Role;
                fullName: string;
                email: string;
                password: string;
                resume: string | null;
                profile: string | null;
                phoneNumber: string;
                bio: string | null;
                otp: number | null;
                otpExpiry: Date | null;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            jobId: number;
            userId: number;
            status: import("generated/prisma").$Enums.ApplicationStatus;
            resumeUrl: string | null;
        })[];
        jobSkills: {
            skill: string;
        }[];
    } & {
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
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateJob(id: number, updateJob: CreateJobDto): Promise<{
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
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteJob(id: number): Promise<{
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
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    applyJob(jobId: number, createApplicationDto: CreateApplicationDto, req: authGuard.RequestWithUser): Promise<any>;
}
