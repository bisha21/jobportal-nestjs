import { JobskillService } from './jobskill.service';
import { CreateJobSkillDto } from './dto/createjobskill.dto';
import { UpdateJobSkillDto } from './dto/updatejobskill.dto';
export declare class JobskillController {
    private readonly jobskillService;
    constructor(jobskillService: JobskillService);
    createJobSkill(createJobSkillDto: CreateJobSkillDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        skill: string;
        jobId: number;
    }>;
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
