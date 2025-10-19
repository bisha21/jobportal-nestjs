import { JobskillService } from './jobskill.service';
import { UpdateJobSkillDto } from './dto/updatejobskill.dto';
import { CreateJobSkillsDto } from './dto/createjobskill.dto';
export declare class JobskillController {
    private readonly jobskillService;
    constructor(jobskillService: JobskillService);
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
    updateJobSkill(skillId: number, updateJobSkillDto: UpdateJobSkillDto): Promise<{
        jobId: number;
        skill: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteJobSkill(skillId: number): Promise<{
        jobId: number;
        skill: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
