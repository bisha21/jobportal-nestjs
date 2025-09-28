import { CreateJobDto } from './dto/createJob';
import { updateJobDto } from './dto/updateJob';
import { DatabaseService } from 'src/database/database.service';
import { SearchJobDto } from './dto/searchJob.dto';
export declare class JobService {
    private prisma;
    private readonly logger;
    constructor(prisma: DatabaseService);
    createJob(createJobDto: CreateJobDto): Promise<{
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
    getSingleJob(jobId: number): Promise<{
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
            userId: number;
            status: import("generated/prisma").$Enums.ApplicationStatus;
            resumeUrl: string | null;
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
    updateJob(jobId: number, updateJobDto: updateJobDto): Promise<{
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
    deleteJob(jobId: number): Promise<{
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
}
