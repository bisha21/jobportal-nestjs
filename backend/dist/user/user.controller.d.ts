import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAllUsers(): Promise<{
        fullName: string;
        email: string;
        resume: string | null;
        profile: string | null;
        phoneNumber: string;
        id: number;
        role: import("../../generated/prisma").$Enums.Role;
    }[]>;
    findAById(id: number): Promise<{
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
