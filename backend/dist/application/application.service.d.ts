import { DatabaseService } from 'src/database/database.service';
import { CreateApplicationDto } from './dto/applyApplication.dto';
import { UpdateApplicationDto } from './dto/updateApplication.dto';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationGateway } from 'src/notification/notification.gateway';
export declare class ApplicationService {
    private readonly prisma;
    private readonly notificationService;
    private readonly notificationGateway;
    constructor(prisma: DatabaseService, notificationService: NotificationService, notificationGateway: NotificationGateway);
    applyJob(userId: number, jobId: number, createApplicationDto: CreateApplicationDto): Promise<any>;
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
    getApplicationById(applicationId: number): Promise<{
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
    updateApplication(applicationId: number, updateApplicationDto: UpdateApplicationDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jobId: number;
        resumeUrl: string | null;
        status: import("generated/prisma").$Enums.ApplicationStatus;
        userId: number;
    }>;
    deleteApplication(applicationId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jobId: number;
        resumeUrl: string | null;
        status: import("generated/prisma").$Enums.ApplicationStatus;
        userId: number;
    }>;
    getApplicationsByUser(userId: number): Promise<({
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
    getApplicationsByJob(jobId: number): Promise<({
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
