"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobController = void 0;
const common_1 = require("@nestjs/common");
const job_service_1 = require("./job.service");
const createJob_1 = require("./dto/createJob");
const authGuard = __importStar(require("../common/guards/auth/auth.guard"));
const searchJob_dto_1 = require("./dto/searchJob.dto");
const application_service_1 = require("../application/application.service");
const applyApplication_dto_1 = require("../application/dto/applyApplication.dto");
const role_decorator_1 = require("../common/guards/role/role.decorator");
const role_enum_1 = require("../common/guards/role/role.enum");
const role_guard_1 = require("../common/guards/role/role.guard");
const updateJob_1 = require("./dto/updateJob");
let JobController = class JobController {
    jobService;
    applicationService;
    constructor(jobService, applicationService) {
        this.jobService = jobService;
        this.applicationService = applicationService;
    }
    async createJob(createJob) {
        return await this.jobService.createJob(createJob);
    }
    async getAllJobs(query) {
        return await this.jobService.getAllJobs(query);
    }
    async getSingleJob(id) {
        return await this.jobService.getSingleJob(id);
    }
    async updateJob(id, updateJob) {
        return await this.jobService.updateJob(id, updateJob);
    }
    async deleteJob(id) {
        return await this.jobService.deleteJob(id);
    }
    async applyJob(jobId, createApplicationDto, req) {
        const userId = req.user.id;
        return await this.applicationService.applyJob(userId, jobId, createApplicationDto);
    }
};
exports.JobController = JobController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(authGuard.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Role)(role_enum_1.Role.EMPLOYEE, role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createJob_1.CreateJobDto]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "createJob", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [searchJob_dto_1.SearchJobDto]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "getAllJobs", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "getSingleJob", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(authGuard.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Role)(role_enum_1.Role.EMPLOYEE, role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateJob_1.updateJobDto]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "updateJob", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(authGuard.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Role)(role_enum_1.Role.EMPLOYEE),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "deleteJob", null);
__decorate([
    (0, common_1.Post)('apply/:jobId'),
    (0, common_1.UseGuards)(authGuard.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Role)(role_enum_1.Role.JOBSEEKER),
    __param(0, (0, common_1.Param)('jobId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, applyApplication_dto_1.CreateApplicationDto, Object]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "applyJob", null);
exports.JobController = JobController = __decorate([
    (0, common_1.Controller)('job'),
    __metadata("design:paramtypes", [job_service_1.JobService,
        application_service_1.ApplicationService])
], JobController);
//# sourceMappingURL=job.controller.js.map