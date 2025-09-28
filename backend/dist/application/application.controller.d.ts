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
        userId: number;
        status: import("generated/prisma").$Enums.ApplicationStatus;
        resumeUrl: string | null;
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
        userId: number;
        status: import("generated/prisma").$Enums.ApplicationStatus;
        resumeUrl: string | null;
    }>;
    updateApplication(id: number, updateApplicationDto: UpdateApplicationDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jobId: number;
        userId: number;
        status: import("generated/prisma").$Enums.ApplicationStatus;
        resumeUrl: string | null;
    }>;
    deleteApplication(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jobId: number;
        userId: number;
        status: import("generated/prisma").$Enums.ApplicationStatus;
        resumeUrl: string | null;
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
        userId: number;
        status: import("generated/prisma").$Enums.ApplicationStatus;
        resumeUrl: string | null;
    })[]>;
}
