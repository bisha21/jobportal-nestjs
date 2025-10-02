"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const hashpassword_1 = require("../utils/hashpassword");
const generateAuthToken_1 = require("../utils/generateAuthToken");
const jwt_1 = require("@nestjs/jwt");
const generateOtp_1 = __importDefault(require("../utils/generateOtp"));
const mail_service_1 = require("../mail/mail.service");
let AuthService = class AuthService {
    prisma;
    jwtService;
    mailService;
    constructor(prisma, jwtService, mailService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async registerUser(createUserDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: createUserDto.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Email already registered');
        }
        const hashedPassword = await (0, hashpassword_1.hashPassword)(createUserDto.password);
        const user = await this.prisma.user.create({
            data: {
                ...createUserDto,
                password: hashedPassword,
            },
        });
        const token = (0, generateAuthToken_1.generateAuthToken)(this.jwtService, {
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        const { password, ...userData } = user;
        return {
            user: userData,
            token,
        };
    }
    async registerOAuthUser(createOAuthUserDto) {
        const { email, fullName, profile } = createOAuthUserDto;
        let user = await this.prisma.user.findUnique({ where: { email } });
        if (user) {
            return user;
        }
        user = await this.prisma.user.create({
            data: {
                email,
                fullName,
                profile: profile || null,
                password: '',
                phoneNumber: '',
            },
        });
        return user;
    }
    async login(createLoginDto) {
        const userExists = await this.prisma.user.findUnique({
            where: { email: createLoginDto.email },
        });
        if (!userExists) {
            throw new common_1.NotFoundException('User not found ');
        }
        const isPasswordMatch = await (0, hashpassword_1.comparePassword)(createLoginDto.password, userExists.password);
        if (!isPasswordMatch) {
            throw new common_1.NotFoundException('Invalid Email or password');
        }
        const token = (0, generateAuthToken_1.generateAuthToken)(this.jwtService, {
            userId: userExists.id,
            email: userExists.email,
            role: userExists.role,
        });
        const { password, ...userData } = userExists;
        return {
            user: userData,
            token,
        };
    }
    async handleForgetPassword(forgetPasswordDto) {
        const { email } = forgetPasswordDto;
        const userExists = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!userExists) {
            throw new common_1.NotFoundException('User not found');
        }
        const otp = (0, generateOtp_1.default)();
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
        await this.prisma.user.update({
            where: { email },
            data: { otp, otpExpiry },
        });
        await this.mailService.sendMail({
            email,
            subject: 'Password Reset OTP',
            html: `<p>Hello ${userExists.fullName},</p>
           <p>Your OTP for password reset is: <b>${otp}</b></p>
           <p>This OTP is valid for 5 minutes.</p>`,
            message: `Your OTP for password reset is ${otp}. It is valid for 5 minutes.`,
        });
        return { message: 'OTP sent to your email address' };
    }
    async verifyOtp(verifyOtpDto) {
        const { email, otp } = verifyOtpDto;
        const userExists = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!userExists) {
            throw new common_1.NotFoundException('User not found');
        }
        if (userExists.otp !== otp) {
            throw new common_1.NotFoundException('Invalid OTP');
        }
        if (!userExists.otpExpiry || userExists.otpExpiry.getTime() < Date.now()) {
            throw new common_1.NotFoundException('OTP expired');
        }
        return { message: 'OTP verified successfully' };
    }
    async resetPassword(ressetPasswordDto) {
        const { password, confirmPassword, email, otp } = ressetPasswordDto;
        const userExists = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!userExists) {
            throw new common_1.NotFoundException('User not found');
        }
        if (userExists.otp !== otp) {
            throw new common_1.NotFoundException('Invalid OTP');
        }
        if (!userExists.otpExpiry || userExists.otpExpiry.getTime() < Date.now()) {
            throw new common_1.NotFoundException('OTP expired');
        }
        if (password !== confirmPassword) {
            throw new common_1.NotFoundException('Password and confirm password not matched');
        }
        const hashedPassword = await (0, hashpassword_1.hashPassword)(password);
        await this.prisma.user.update({
            where: { email },
            data: { password: hashedPassword, otp: null, otpExpiry: null },
        });
        return { message: 'Password reset successfully' };
    }
    async getProfile(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                applications: {
                    include: {
                        job: {
                            select: {
                                title: true,
                                company: {
                                    select: {
                                        name: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async updateProfilePicture(userId, imageUrl) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { profile: imageUrl },
        });
    }
    async findUserByEmail(email) {
        return await this.prisma.user.findFirst({
            where: { email },
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        jwt_1.JwtService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map