import { JobskillService } from './jobskill.service';
import { UpdateJobSkillDto } from './dto/updatejobskill.dto';
import { CreateJobSkillsDto } from './dto/createjobskill.dto';
export declare class JobskillController {
    private readonly jobskillService;
    constructor(jobskillService: JobskillService);
    createJobSkill(dto: CreateJobSkillsDto): Promise<({
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
    updateJobSkill(skillId: number, updateJobSkillDto: UpdateJobSkillDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        skill: string;
        jobId: number;
    }>;
    deleteJobSkill(skillId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        skill: string;
        jobId: number;
    }>;
}
