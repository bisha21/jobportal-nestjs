import { DatabaseService } from 'src/database/database.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: DatabaseService);
    findAllUsers(): Promise<{
        fullName: string;
        email: string;
        resume: string | null;
        profile: string | null;
        phoneNumber: string;
        id: number;
        role: import("generated/prisma").$Enums.Role;
    }[]>;
    findUserById(id: number): Promise<{
        applications: ({
            job: {
                company: {
                    name: string;
                };
                title: string;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            jobId: number;
            resumeUrl: string | null;
            status: import("generated/prisma").$Enums.ApplicationStatus;
        })[];
    } & {
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
    }>;
}
