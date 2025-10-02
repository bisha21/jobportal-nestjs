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
        createdAt: Date;
        updatedAt: Date;
        id: number;
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
        title: string;
        description: string;
        position: string;
        location: string | null;
        experience: string;
        salaryMin: number;
        salaryMax: number;
        type: import("generated/prisma").$Enums.JobType;
        deadline: Date | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        companyId: number;
        categoryId: number;
    })[]>;
    getSingleJob(jobId: number): Promise<{
        company: {
            description: string;
            location: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            name: string;
            website: string | null;
            industry: string;
            companySize: string;
            logoUrl: string | null;
            ownerId: number;
        };
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
        createdAt: Date;
        updatedAt: Date;
        id: number;
        companyId: number;
        categoryId: number;
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
        createdAt: Date;
        updatedAt: Date;
        id: number;
        companyId: number;
        categoryId: number;
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
        createdAt: Date;
        updatedAt: Date;
        id: number;
        companyId: number;
        categoryId: number;
    }>;
}
