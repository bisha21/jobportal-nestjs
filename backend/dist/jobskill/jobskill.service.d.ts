import { DatabaseService } from 'src/database/database.service';
import { UpdateJobSkillDto } from './dto/updatejobskill.dto';
import { CreateJobSkillsDto } from './dto/createjobskill.dto';
export declare class JobskillService {
    private prisma;
    constructor(prisma: DatabaseService);
    createJobSkills(dto: CreateJobSkillsDto): Promise<({
        jobSkills: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            skill: string;
            jobId: number;
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
    }) | null>;
    getJobSkills(jobId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        skill: string;
        jobId: number;
    }[]>;
    updateJobSkills(skillId: number, updateJobSkillDto: UpdateJobSkillDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        skill: string;
        jobId: number;
    }>;
    deleteJobSkills(skillId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        skill: string;
        jobId: number;
    }>;
}
