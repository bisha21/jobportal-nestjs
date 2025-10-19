import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/register.dto';
import { CreateLoginDto } from './dto/login.dto';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { VerifyOtpDto } from './dto/verifyotp.dto';
import { ResetPasswordDto } from './dto/resetpassword.dto';
import { type RequestWithUser } from 'src/common/guards/auth/auth.guard';
import { type Response } from 'express';
import { UpdateUserDto } from './dto/updateUserDto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerUser(createUserDto: CreateUserDto): Promise<{
        user: {
            email: string;
            id: number;
            fullName: string;
            resume: string | null;
            profile: string | null;
            phoneNumber: string;
            bio: string | null;
            role: import("../../generated/prisma").$Enums.Role;
            otp: number | null;
            otpExpiry: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
    login(createLoginDto: CreateLoginDto): Promise<{
        user: {
            email: string;
            id: number;
            fullName: string;
            resume: string | null;
            profile: string | null;
            phoneNumber: string;
            bio: string | null;
            role: import("../../generated/prisma").$Enums.Role;
            otp: number | null;
            otpExpiry: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
    forgetPassword(forgetPasswordDto: ForgetPasswordDto): Promise<{
        message: string;
    }>;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    getProfile(req: RequestWithUser): Promise<{
        email: string;
        password: string;
        id: number;
        fullName: string;
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
    updateProfile(updateUserDto: UpdateUserDto, req: RequestWithUser): Promise<{
        email: string;
        password: string;
        id: number;
        fullName: string;
        resume: string | null;
        profile: string | null;
        phoneNumber: string;
        bio: string | null;
        role: import("../../generated/prisma").$Enums.Role;
        otp: number | null;
        otpExpiry: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    googleLogin(): Promise<void>;
    googleCallback(req: RequestWithUser, res: Response): void;
}
