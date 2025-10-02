import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/register.dto';
import { CreateLoginDto } from './dto/login.dto';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { VerifyOtpDto } from './dto/verifyotp.dto';
import { ResetPasswordDto } from './dto/resetpassword.dto';
import { type RequestWithUser } from 'src/common/guards/auth/auth.guard';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    googleLogin(): Promise<void>;
    googleCallback(): Promise<void>;
}
