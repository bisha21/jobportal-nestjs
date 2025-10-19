import { ApplicationService } from './application.service';
import { UpdateApplicationDto } from './dto/updateApplication.dto';
import { type RequestWithUser } from 'src/common/guards/auth/auth.guard';
import { SearchApplicationDto } from './dto/searchApplication.dto';
export declare class ApplicationController {
    private readonly applicationService;
    constructor(applicationService: ApplicationService);
    getAllApplications(query: SearchApplicationDto): Promise<{
        userId: number;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma").$Enums.ApplicationStatus;
        resumeUrl: string | null;
        jobId: number;
    }[]>;
    getApplicationById(id: number): Promise<any>;
    updateApplication(id: number, updateApplicationDto: UpdateApplicationDto): Promise<{
        userId: number;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma").$Enums.ApplicationStatus;
        resumeUrl: string | null;
        jobId: number;
    }>;
    deleteApplication(id: number): Promise<{
        userId: number;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma").$Enums.ApplicationStatus;
        resumeUrl: string | null;
        jobId: number;
    }>;
    getMyApplications(req: RequestWithUser): Promise<any>;
    checkIfApplied(jobId: number, req: RequestWithUser): Promise<{
        isApplied: boolean;
    }>;
}
