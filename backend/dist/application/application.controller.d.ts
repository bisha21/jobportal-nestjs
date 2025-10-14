import { ApplicationService } from './application.service';
import { UpdateApplicationDto } from './dto/updateApplication.dto';
import { type RequestWithUser } from 'src/common/guards/auth/auth.guard';
import { SearchApplicationDto } from './dto/searchApplication.dto';
export declare class ApplicationController {
    private readonly applicationService;
    constructor(applicationService: ApplicationService);
    getAllApplications(query: SearchApplicationDto): Promise<{
        id: number;
        userId: number;
        jobId: number;
        status: import("../../generated/prisma").$Enums.ApplicationStatus;
        resumeUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getApplicationById(id: number): Promise<({
        user: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            email: string;
            password: string;
            resume: string | null;
            profile: string | null;
            phoneNumber: string;
            bio: string | null;
            role: import("../../generated/prisma").$Enums.Role;
            otp: number | null;
            otpExpiry: Date | null;
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
            type: import("../../generated/prisma").$Enums.JobType;
            deadline: Date | null;
            companyId: number;
            categoryId: number;
        };
    } & {
        id: number;
        userId: number;
        jobId: number;
        status: import("../../generated/prisma").$Enums.ApplicationStatus;
        resumeUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    updateApplication(id: number, updateApplicationDto: UpdateApplicationDto): Promise<{
        id: number;
        userId: number;
        jobId: number;
        status: import("../../generated/prisma").$Enums.ApplicationStatus;
        resumeUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteApplication(id: number): Promise<{
        id: number;
        userId: number;
        jobId: number;
        status: import("../../generated/prisma").$Enums.ApplicationStatus;
        resumeUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
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
            type: import("../../generated/prisma").$Enums.JobType;
            deadline: Date | null;
            companyId: number;
            categoryId: number;
        };
    } & {
        id: number;
        userId: number;
        jobId: number;
        status: import("../../generated/prisma").$Enums.ApplicationStatus;
        resumeUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    checkIfApplied(jobId: number, req: RequestWithUser): Promise<{
        isApplied: boolean;
    }>;
}
