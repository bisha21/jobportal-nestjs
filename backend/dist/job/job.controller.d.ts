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
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        type: import("generated/prisma").$Enums.JobType;
        location: string | null;
        companyId: number;
        title: string;
        position: string;
        experience: string;
        salaryMin: number;
        salaryMax: number;
        deadline: Date | null;
        categoryId: number;
    }>;
    getAllJobs(query: SearchJobDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        type: import("generated/prisma").$Enums.JobType;
        location: string | null;
        companyId: number;
        title: string;
        position: string;
        experience: string;
        salaryMin: number;
        salaryMax: number;
        deadline: Date | null;
        categoryId: number;
    }[]>;
    getSingleJob(id: number): Promise<{
        applications: ({
            user: {
                fullName: string;
                email: string;
                password: string;
                resume: string | null;
                profile: string | null;
                phoneNumber: string;
                bio: string | null;
                otp: number | null;
                id: number;
                role: import("generated/prisma").$Enums.Role;
                otpExpiry: Date | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            jobId: number;
            resumeUrl: string | null;
            status: import("generated/prisma").$Enums.ApplicationStatus;
            userId: number;
        })[];
        jobSkills: {
            skill: string;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        type: import("generated/prisma").$Enums.JobType;
        location: string | null;
        companyId: number;
        title: string;
        position: string;
        experience: string;
        salaryMin: number;
        salaryMax: number;
        deadline: Date | null;
        categoryId: number;
    }>;
    updateJob(id: number, updateJob: CreateJobDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        type: import("generated/prisma").$Enums.JobType;
        location: string | null;
        companyId: number;
        title: string;
        position: string;
        experience: string;
        salaryMin: number;
        salaryMax: number;
        deadline: Date | null;
        categoryId: number;
    }>;
    deleteJob(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        type: import("generated/prisma").$Enums.JobType;
        location: string | null;
        companyId: number;
        title: string;
        position: string;
        experience: string;
        salaryMin: number;
        salaryMax: number;
        deadline: Date | null;
        categoryId: number;
    }>;
    applyJob(jobId: number, createApplicationDto: CreateApplicationDto, req: authGuard.RequestWithUser): Promise<any>;
}
