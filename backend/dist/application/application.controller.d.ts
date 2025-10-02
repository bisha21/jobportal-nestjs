import { ApplicationService } from './application.service';
import { UpdateApplicationDto } from './dto/updateApplication.dto';
import { type RequestWithUser } from 'src/common/guards/auth/auth.guard';
export declare class ApplicationController {
    private readonly applicationService;
    constructor(applicationService: ApplicationService);
    getAllApplications(): Promise<({
        user: {
            fullName: string;
            email: string;
            password: string;
            resume: string | null;
            profile: string | null;
            phoneNumber: string;
            bio: string | null;
            otp: number | null;
            id: number;
            role: import("generated/prisma").$Enums.Role;
            otpExpiry: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
        job: {
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
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        jobId: number;
        resumeUrl: string | null;
        status: import("generated/prisma").$Enums.ApplicationStatus;
    })[]>;
    getApplicationById(id: number): Promise<{
        user: {
            fullName: string;
            email: string;
            password: string;
            resume: string | null;
            profile: string | null;
            phoneNumber: string;
            bio: string | null;
            otp: number | null;
            id: number;
            role: import("generated/prisma").$Enums.Role;
            otpExpiry: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
        job: {
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
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        jobId: number;
        resumeUrl: string | null;
        status: import("generated/prisma").$Enums.ApplicationStatus;
    }>;
    updateApplication(id: number, updateApplicationDto: UpdateApplicationDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        jobId: number;
        resumeUrl: string | null;
        status: import("generated/prisma").$Enums.ApplicationStatus;
    }>;
    deleteApplication(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        jobId: number;
        resumeUrl: string | null;
        status: import("generated/prisma").$Enums.ApplicationStatus;
    }>;
    getMyApplications(req: RequestWithUser): Promise<({
        job: {
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
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        jobId: number;
        resumeUrl: string | null;
        status: import("generated/prisma").$Enums.ApplicationStatus;
    })[]>;
}
