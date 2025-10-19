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
            jobId: number;
            skill: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        description: string;
        type: import("../../generated/prisma").$Enums.JobType;
        title: string;
        id: number;
        position: string;
        location: string | null;
        experience: string;
        salaryMin: number;
        salaryMax: number;
        deadline: Date | null;
        companyId: number;
        categoryId: number;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    getJobSkills(jobId: number): Promise<{
        jobId: number;
        skill: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    updateJobSkills(skillId: number, updateJobSkillDto: UpdateJobSkillDto): Promise<{
        jobId: number;
        skill: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteJobSkills(skillId: number): Promise<{
        jobId: number;
        skill: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    topSkills(): Promise<{
        skill: string;
        demand: number;
        jobs: number;
    }[]>;
}
