import { CreateUserDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateLoginDto } from './dto/login.dto';
import { MailService } from 'src/mail/mail.service';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { VerifyOtpDto } from './dto/verifyotp.dto';
import { ResetPasswordDto } from './dto/resetpassword.dto';
import { CreateOAuthUserDto } from './dto/createoauth.dto';
import { UpdateUserDto } from './dto/updateUserDto';
import { DatabaseService } from 'src/database/database.service';
import { RedisService } from '../redis/redis.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    private mailService;
    private redis;
    constructor(prisma: DatabaseService, jwtService: JwtService, mailService: MailService, redis: RedisService);
    registerUser(createUserDto: CreateUserDto): Promise<{
        user: {
            id: number;
            email: string;
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
    registerOAuthUser(createOAuthUserDto: CreateOAuthUserDto): Promise<{
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
    }>;
    login(createLoginDto: CreateLoginDto): Promise<{
        user: {
            id: number;
            email: string;
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
    handleForgetPassword(forgetPasswordDto: ForgetPasswordDto): Promise<{
        message: string;
    }>;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{
        message: string;
    }>;
    resetPassword(ressetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    getProfile(userId: number): Promise<{
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
    updateProfilePicture(userId: number, imageUrl: string): Promise<{
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
    }>;
    updateResume(userId: number, resumeUrl: string): Promise<{
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
    }>;
    findUserByEmail(email: string): Promise<{
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
    updateProfile(userId: number, updateUserDto: UpdateUserDto): Promise<{
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
    }>;
}
