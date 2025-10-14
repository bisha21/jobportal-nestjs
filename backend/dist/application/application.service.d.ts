import { DatabaseService } from 'src/database/database.service';
import { CreateApplicationDto } from './dto/applyApplication.dto';
import { UpdateApplicationDto } from './dto/updateApplication.dto';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationGateway } from 'src/notification/notification.gateway';
import { SearchApplicationDto } from './dto/searchApplication.dto';
export declare class ApplicationService {
    private readonly prisma;
    private readonly notificationService;
    private readonly notificationGateway;
    constructor(prisma: DatabaseService, notificationService: NotificationService, notificationGateway: NotificationGateway);
    applyJob(userId: number, jobId: number, createApplicationDto: CreateApplicationDto): Promise<any>;
    getAllApplications(query: SearchApplicationDto): Promise<{
        id: number;
        userId: number;
        jobId: number;
        status: import("../../generated/prisma").$Enums.ApplicationStatus;
        resumeUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    updateApplication(applicationId: number, updateApplicationDto: UpdateApplicationDto): Promise<{
        id: number;
        userId: number;
        jobId: number;
        status: import("../../generated/prisma").$Enums.ApplicationStatus;
        resumeUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteApplication(applicationId: number): Promise<{
        id: number;
        userId: number;
        jobId: number;
        status: import("../../generated/prisma").$Enums.ApplicationStatus;
        resumeUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getApplicationsByUser(userId: number): Promise<({
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
    getApplicationsByJob(jobId: number): Promise<({
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
    } & {
        id: number;
        userId: number;
        jobId: number;
        status: import("../../generated/prisma").$Enums.ApplicationStatus;
        resumeUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getApplicationsById(id: number): Promise<({
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
    checkIfApplied(userId: number, jobId: number): Promise<boolean>;
}
