import { DatabaseService } from 'src/database/database.service';
import { CreateApplicationDto } from './dto/applyApplication.dto';
import { UpdateApplicationDto } from './dto/updateApplication.dto';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationGateway } from 'src/notification/notification.gateway';
import { SearchApplicationDto } from './dto/searchApplication.dto';
import { RedisService } from 'src/redis/redis.service';
export declare class ApplicationService {
    private readonly prisma;
    private readonly notificationService;
    private readonly notificationGateway;
    private readonly redis;
    constructor(prisma: DatabaseService, notificationService: NotificationService, notificationGateway: NotificationGateway, redis: RedisService);
    applyJob(userId: number, jobId: number, createApplicationDto: CreateApplicationDto): Promise<any>;
    getAllApplications(query: SearchApplicationDto): Promise<{
        userId: number;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma").$Enums.ApplicationStatus;
        resumeUrl: string | null;
        jobId: number;
    }[]>;
    updateApplication(applicationId: number, updateApplicationDto: UpdateApplicationDto): Promise<{
        userId: number;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma").$Enums.ApplicationStatus;
        resumeUrl: string | null;
        jobId: number;
    }>;
    deleteApplication(applicationId: number): Promise<{
        userId: number;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma").$Enums.ApplicationStatus;
        resumeUrl: string | null;
        jobId: number;
    }>;
    getApplicationsByUser(userId: number): Promise<any>;
    getApplicationsByJob(jobId: number): Promise<any>;
    getApplicationsById(id: number): Promise<any>;
    checkIfApplied(userId: number, jobId: number): Promise<boolean>;
}
