import { JobType } from '@prisma/client';
export declare class CreateJobDto {
    title: string;
    description: string;
    position: string;
    location?: string;
    experience: string;
    salaryMin: number;
    salaryMax: number;
    type?: JobType;
    deadline?: string;
    companyId: number;
    categoryId: number;
}
