import { JobskillService } from './jobskill.service';
import { UpdateJobSkillDto } from './dto/updatejobskill.dto';
import { CreateJobSkillsDto } from './dto/createjobskill.dto';
export declare class JobskillController {
    private readonly jobskillService;
    constructor(jobskillService: JobskillService);
    createJobSkill(dto: CreateJobSkillsDto): Promise<({
        jobSkills: {
            jobId: number;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            skill: string;
        }[];
    } & {
        id: number;
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
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    getJobSkills(jobId: number): Promise<{
        jobId: number;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        skill: string;
    }[]>;
    updateJobSkill(skillId: number, updateJobSkillDto: UpdateJobSkillDto): Promise<{
        jobId: number;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        skill: string;
    }>;
    deleteJobSkill(skillId: number): Promise<{
        jobId: number;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        skill: string;
    }>;
}
