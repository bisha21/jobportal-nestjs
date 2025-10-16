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
    getApplicationsByUser(userId: number): Promise<any>;
    getApplicationsByJob(jobId: number): Promise<any>;
    getApplicationsById(id: number): Promise<any>;
    checkIfApplied(userId: number, jobId: number): Promise<boolean>;
}
