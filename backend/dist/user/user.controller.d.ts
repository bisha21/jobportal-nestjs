import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAllUsers(): Promise<{
        id: number;
        email: string;
        fullName: string;
        resume: string | null;
        profile: string | null;
        phoneNumber: string;
        role: import("../../generated/prisma").$Enums.Role;
    }[]>;
    findAById(id: number): Promise<{
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
