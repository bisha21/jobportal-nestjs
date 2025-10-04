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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = __importDefault(require("multer"));
const auth_service_1 = require("../auth/auth.service");
const cloudinary_service_1 = require("../cloudinary/cloudinary/cloudinary.service");
const auth_guard_1 = require("../common/guards/auth/auth.guard");
const company_service_1 = require("../company/company.service");
const storage = multer_1.default.memoryStorage();
let UploadController = class UploadController {
    cloudinaryService;
    authService;
    companyService;
    constructor(cloudinaryService, authService, companyService) {
        this.cloudinaryService = cloudinaryService;
        this.authService = authService;
        this.companyService = companyService;
    }
    async uploadProfilePicture(file, req) {
        const imageUrl = await this.cloudinaryService.uploadFile(file);
        await this.authService.updateProfilePicture(req.user.id, imageUrl);
        return { message: 'Profile picture uploaded', url: imageUrl };
    }
    async uploadResume(file, req) {
        const resumeUrl = await this.cloudinaryService.uploadFile(file);
        await this.authService.updateResume(req.user.id, resumeUrl);
        return { message: 'Resume uploaded successfully', url: resumeUrl };
    }
    async uploadCompanyLogo(file, req, companyId) {
        const logoUrl = await this.cloudinaryService.uploadFile(file);
        await this.companyService.updateCompanyLogo(companyId, logoUrl);
        return { message: 'Company logo uploaded', url: logoUrl };
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)('profile'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('profilePicture', {
        storage,
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                return cb(new common_1.BadRequestException('Only image files are allowed!'), false);
            }
            cb(null, true);
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadProfilePicture", null);
__decorate([
    (0, common_1.Post)('resume'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('resume', {
        storage,
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            const allowedMimeTypes = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'image/jpeg',
                'image/png',
            ];
            if (!allowedMimeTypes.includes(file.mimetype)) {
                return cb(new common_1.BadRequestException('Only PDF, DOC, DOCX, JPG, JPEG, and PNG files are allowed!'), false);
            }
            cb(null, true);
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadResume", null);
__decorate([
    (0, common_1.Patch)('logo/:companyId'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('companyLogo', {
        storage,
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                return cb(new common_1.BadRequestException('Only image files are allowed!'), false);
            }
            cb(null, true);
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadCompanyLogo", null);
exports.UploadController = UploadController = __decorate([
    (0, common_1.Controller)('upload'),
    __metadata("design:paramtypes", [cloudinary_service_1.CloudinaryService,
        auth_service_1.AuthService,
        company_service_1.CompanyService])
], UploadController);
//# sourceMappingURL=upload.controller.js.map