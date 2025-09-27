import { DatabaseService } from 'src/database/database.service';
import { CreateJobSkillDto } from './dto/createjobskill.dto';
import { UpdateJobSkillDto } from './dto/updatejobskill.dto';
export declare class JobskillService {
    private prisma;
    constructor(prisma: DatabaseService);
    createJobSkills(createJobSkillDto: CreateJobSkillDto): Promise<{
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
