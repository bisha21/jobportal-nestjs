import { DatabaseService } from 'src/database/database.service';
import { RedisService } from 'src/redis/redis.service';
export declare class UserService {
    private readonly prisma;
    private readonly redis;
    constructor(prisma: DatabaseService, redis: RedisService);
    findAllUsers(): Promise<{
        id: number;
        email: string;
        fullName: string;
        resume: string | null;
        profile: string | null;
        phoneNumber: string;
        role: import("../../generated/prisma").$Enums.Role;
    }[]>;
    findUserById(id: number): Promise<{
        id: number;
        email: string;
        fullName: string;
        password: string;
        resume: string | null;
        profile: string | null;
        phoneNumber: string;
        bio: string | null;
        role: import("../../generated/prisma").$Enums.Role;
        otp: number | null;
        otpExpiry: Date | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
