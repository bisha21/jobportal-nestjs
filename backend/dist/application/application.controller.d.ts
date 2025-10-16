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
    getApplicationById(id: number): Promise<any>;
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
    getMyApplications(req: RequestWithUser): Promise<any>;
    checkIfApplied(jobId: number, req: RequestWithUser): Promise<{
        isApplied: boolean;
    }>;
}
