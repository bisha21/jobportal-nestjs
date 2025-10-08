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
    getSingleJob(jobId: number): Promise<{
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
    updateJob(jobId: number, updateJobDto: updateJobDto): Promise<{
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
    deleteJob(jobId: number): Promise<{
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
}
