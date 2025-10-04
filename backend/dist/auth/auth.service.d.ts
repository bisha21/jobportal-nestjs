import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateLoginDto } from './dto/login.dto';
import { MailService } from 'src/mail/mail.service';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { VerifyOtpDto } from './dto/verifyotp.dto';
import { ResetPasswordDto } from './dto/resetpassword.dto';
import { CreateOAuthUserDto } from './dto/createoauth.dto';
import { UpdateUserDto } from './dto/updateUserDto';
export declare class AuthService {
    private prisma;
    private jwtService;
    private mailService;
    constructor(prisma: DatabaseService, jwtService: JwtService, mailService: MailService);
    registerUser(createUserDto: CreateUserDto): Promise<{
        user: {
            fullName: string;
            email: string;
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
        };
        token: string;
    }>;
    registerOAuthUser(createOAuthUserDto: CreateOAuthUserDto): Promise<{
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
    login(createLoginDto: CreateLoginDto): Promise<{
        user: {
            fullName: string;
            email: string;
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
    updateProfilePicture(userId: number, imageUrl: string): Promise<{
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
    updateResume(userId: number, resumeUrl: string): Promise<{
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
    findUserByEmail(email: string): Promise<{
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
    } | null>;
    updateProfile(userId: number, updateUserDto: UpdateUserDto): Promise<{
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
