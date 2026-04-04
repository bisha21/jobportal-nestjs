import { DatabaseService } from 'src/database/database.service';
import { RedisService } from 'src/redis/redis.service';
export declare class UserService {
    private readonly prisma;
    private readonly redis;
    constructor(prisma: DatabaseService, redis: RedisService);
    findAllUsers(): Promise<{
        fullName: string;
        email: string;
        resume: string | null;
        profile: string | null;
        phoneNumber: string;
        id: number;
        role: import("../../generated/prisma").$Enums.Role;
    }[]>;
    findUserById(id: number): Promise<{
        fullName: string;
        email: string;
        password: string;
        resume: string | null;
        profile: string | null;
        phoneNumber: string;
        bio: string | null;
        otp: number | null;
        id: number;
        role: import("../../generated/prisma").$Enums.Role;
        otpExpiry: Date | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
