import { CreateJobDto } from './dto/createJob';
import { updateJobDto } from './dto/updateJob';
import { DatabaseService } from 'src/database/database.service';
import { SearchJobDto } from './dto/searchJob.dto';
export declare class JobService {
    private prisma;
    private readonly logger;
    constructor(prisma: DatabaseService);
    createJob(createJobDto: CreateJobDto): Promise<{
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
    getSingleJob(jobId: number): Promise<{
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
    updateJob(jobId: number, updateJobDto: updateJobDto): Promise<{
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
    deleteJob(jobId: number): Promise<{
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
}
