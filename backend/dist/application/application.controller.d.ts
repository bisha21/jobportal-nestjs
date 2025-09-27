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
            description: string;
            type: import("generated/prisma").$Enums.JobType;
            location: string | null;
            companyId: number;
            title: string;
            position: string;
            experience: string;
            salaryMin: number;
            salaryMax: number;
            deadline: Date | null;
            categoryId: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jobId: number;
        resumeUrl: string | null;
        status: import("generated/prisma").$Enums.ApplicationStatus;
        userId: number;
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
            description: string;
            type: import("generated/prisma").$Enums.JobType;
            location: string | null;
            companyId: number;
            title: string;
            position: string;
            experience: string;
            salaryMin: number;
            salaryMax: number;
            deadline: Date | null;
            categoryId: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jobId: number;
        resumeUrl: string | null;
        status: import("generated/prisma").$Enums.ApplicationStatus;
        userId: number;
    }>;
    updateApplication(id: number, updateApplicationDto: UpdateApplicationDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jobId: number;
        resumeUrl: string | null;
        status: import("generated/prisma").$Enums.ApplicationStatus;
        userId: number;
    }>;
    deleteApplication(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jobId: number;
        resumeUrl: string | null;
        status: import("generated/prisma").$Enums.ApplicationStatus;
        userId: number;
    }>;
    getMyApplications(req: RequestWithUser): Promise<({
        job: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            type: import("generated/prisma").$Enums.JobType;
            location: string | null;
            companyId: number;
            title: string;
            position: string;
            experience: string;
            salaryMin: number;
            salaryMax: number;
            deadline: Date | null;
            categoryId: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jobId: number;
        resumeUrl: string | null;
        status: import("generated/prisma").$Enums.ApplicationStatus;
        userId: number;
    })[]>;
}
