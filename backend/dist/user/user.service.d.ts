import { DatabaseService } from 'src/database/database.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: DatabaseService);
    findAllUsers(): Promise<{
        id: number;
        fullName: string;
        email: string;
        resume: string | null;
        profile: string | null;
        phoneNumber: string;
        role: import("generated/prisma").$Enums.Role;
    }[]>;
    findUserById(id: number): Promise<{
        applications: ({
            job: {
                title: string;
                company: {
                    name: string;
                };
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            jobId: number;
            status: import("generated/prisma").$Enums.ApplicationStatus;
            resumeUrl: string | null;
        })[];
    } & {
        id: number;
        fullName: string;
        email: string;
        password: string;
        resume: string | null;
        profile: string | null;
        phoneNumber: string;
        bio: string | null;
        role: import("generated/prisma").$Enums.Role;
        otp: number | null;
        otpExpiry: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
