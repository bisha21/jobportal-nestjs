import { DatabaseService } from 'src/database/database.service';
import { UpdateJobSkillDto } from './dto/updatejobskill.dto';
import { CreateJobSkillsDto } from './dto/createjobskill.dto';
import { RedisService } from 'src/redis/redis.service';
export declare class JobskillService {
    private prisma;
    private redis;
    constructor(prisma: DatabaseService, redis: RedisService);
    createJobSkill(dto: CreateJobSkillsDto): Promise<({
        jobSkills: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            jobId: number;
            skill: string;
        }[];
    } & {
        description: string;
        type: import("../../generated/prisma").$Enums.JobType;
        title: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        location: string | null;
        position: string;
        experience: string;
        salaryMin: number;
        salaryMax: number;
        deadline: Date | null;
        companyId: number;
        categoryId: number;
    }) | null>;
    getJobSkills(jobId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jobId: number;
        skill: string;
    }[]>;
    updateJobSkills(skillId: number, updateJobSkillDto: UpdateJobSkillDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jobId: number;
        skill: string;
    }>;
    deleteJobSkills(skillId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jobId: number;
        skill: string;
    }>;
    topSkills(): Promise<{
        skill: string;
        demand: number;
        jobs: number;
    }[]>;
}
