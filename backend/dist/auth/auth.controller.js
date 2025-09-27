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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const register_dto_1 = require("./dto/register.dto");
const login_dto_1 = require("./dto/login.dto");
const forgetPassword_dto_1 = require("./dto/forgetPassword.dto");
const verifyotp_dto_1 = require("./dto/verifyotp.dto");
const resetpassword_dto_1 = require("./dto/resetpassword.dto");
const auth_guard_1 = require("../common/guards/auth/auth.guard");
const swagger_1 = require("@nestjs/swagger");
const google_guard_1 = require("../common/guards/google/google.guard");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async registerUser(createUserDto) {
        return this.authService.registerUser(createUserDto);
    }
    async login(createLoginDto) {
        return await this.authService.login(createLoginDto);
    }
    async forgetPassword(forgetPasswordDto) {
        return await this.authService.handleForgetPassword(forgetPasswordDto);
    }
    async verifyOtp(verifyOtpDto) {
        return await this.authService.verifyOtp(verifyOtpDto);
    }
    async resetPassword(resetPasswordDto) {
        return await this.authService.resetPassword(resetPasswordDto);
    }
    async getProfile(req) {
        const userId = req.user.id;
        return await this.authService.getProfile(Number(userId));
    }
    async googleLogin() { }
    async googleCallback() { }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new user' }),
    (0, swagger_1.ApiBody)({ type: register_dto_1.CreateUserDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User successfully registered.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request. Validation failed.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerUser", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'Login user and get JWT token' }),
    (0, swagger_1.ApiBody)({ type: login_dto_1.CreateLoginDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User successfully logged in.' }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized. Invalid credentials.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.CreateLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('forget-password'),
    (0, swagger_1.ApiOperation)({ summary: 'Request password reset OTP' }),
    (0, swagger_1.ApiBody)({ type: forgetPassword_dto_1.ForgetPasswordDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'OTP sent to user email.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgetPassword_dto_1.ForgetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgetPassword", null);
__decorate([
    (0, common_1.Post)('verify-otp'),
    (0, swagger_1.ApiOperation)({ summary: 'Verify OTP sent to user email' }),
    (0, swagger_1.ApiBody)({ type: verifyotp_dto_1.VerifyOtpDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'OTP verified successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid OTP or expired.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verifyotp_dto_1.VerifyOtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, swagger_1.ApiOperation)({ summary: 'Reset password using verified OTP' }),
    (0, swagger_1.ApiBody)({ type: resetpassword_dto_1.ResetPasswordDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Password reset successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Reset failed. Invalid data.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resetpassword_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get logged-in user profile' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User profile retrieved successfully.',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized. Invalid token.' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('google/login'),
    (0, common_1.UseGuards)(google_guard_1.GoogleAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleLogin", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)(google_guard_1.GoogleAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleCallback", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Authentication'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map