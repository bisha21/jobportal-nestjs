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
    updateJobSkill(skillId: number, updateJobSkillDto: UpdateJobSkillDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jobId: number;
        skill: string;
    }>;
    deleteJobSkill(skillId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jobId: number;
        skill: string;
    }>;
}
