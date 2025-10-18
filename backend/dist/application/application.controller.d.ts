import { ApplicationService } from './application.service';
import { UpdateApplicationDto } from './dto/updateApplication.dto';
import { type RequestWithUser } from 'src/common/guards/auth/auth.guard';
import { SearchApplicationDto } from './dto/searchApplication.dto';
export declare class ApplicationController {
    private readonly applicationService;
    constructor(applicationService: ApplicationService);
    getAllApplications(query: SearchApplicationDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        jobId: number;
        status: import("../../generated/prisma").$Enums.ApplicationStatus;
        resumeUrl: string | null;
    }[]>;
    getApplicationById(id: number): Promise<any>;
    updateApplication(id: number, updateApplicationDto: UpdateApplicationDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        jobId: number;
        status: import("../../generated/prisma").$Enums.ApplicationStatus;
        resumeUrl: string | null;
    }>;
    deleteApplication(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        jobId: number;
        status: import("../../generated/prisma").$Enums.ApplicationStatus;
        resumeUrl: string | null;
    }>;
    getMyApplications(req: RequestWithUser): Promise<any>;
    checkIfApplied(jobId: number, req: RequestWithUser): Promise<{
        isApplied: boolean;
    }>;
}
