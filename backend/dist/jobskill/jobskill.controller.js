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
exports.JobskillController = void 0;
const common_1 = require("@nestjs/common");
const jobskill_service_1 = require("./jobskill.service");
const createjobskill_dto_1 = require("./dto/createjobskill.dto");
const updatejobskill_dto_1 = require("./dto/updatejobskill.dto");
const swagger_1 = require("@nestjs/swagger");
let JobskillController = class JobskillController {
    jobskillService;
    constructor(jobskillService) {
        this.jobskillService = jobskillService;
    }
    async createJobSkill(createJobSkillDto) {
        return this.jobskillService.createJobSkills(createJobSkillDto);
    }
    async getJobSkills(jobId) {
        return this.jobskillService.getJobSkills(jobId);
    }
    async updateJobSkill(skillId, updateJobSkillDto) {
        return this.jobskillService.updateJobSkills(skillId, updateJobSkillDto);
    }
    async deleteJobSkill(skillId) {
        return this.jobskillService.deleteJobSkills(skillId);
    }
};
exports.JobskillController = JobskillController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new job skill' }),
    (0, swagger_1.ApiBody)({ type: createjobskill_dto_1.CreateJobSkillDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Job skill created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid request body' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createjobskill_dto_1.CreateJobSkillDto]),
    __metadata("design:returntype", Promise)
], JobskillController.prototype, "createJobSkill", null);
__decorate([
    (0, common_1.Get)(':jobId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all skills for a specific job' }),
    (0, swagger_1.ApiParam)({ name: 'jobId', type: Number, description: 'ID of the job' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of job skills returned' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Job not found' }),
    __param(0, (0, common_1.Param)('jobId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], JobskillController.prototype, "getJobSkills", null);
__decorate([
    (0, common_1.Patch)(':skillId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing job skill' }),
    (0, swagger_1.ApiParam)({ name: 'skillId', type: Number, description: 'ID of the skill' }),
    (0, swagger_1.ApiBody)({ type: updatejobskill_dto_1.UpdateJobSkillDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Job skill updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Skill not found' }),
    __param(0, (0, common_1.Param)('skillId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updatejobskill_dto_1.UpdateJobSkillDto]),
    __metadata("design:returntype", Promise)
], JobskillController.prototype, "updateJobSkill", null);
__decorate([
    (0, common_1.Delete)(':skillId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a job skill' }),
    (0, swagger_1.ApiParam)({ name: 'skillId', type: Number, description: 'ID of the skill' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Job skill deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Skill not found' }),
    __param(0, (0, common_1.Param)('skillId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], JobskillController.prototype, "deleteJobSkill", null);
exports.JobskillController = JobskillController = __decorate([
    (0, swagger_1.ApiTags)('Job Skills'),
    (0, common_1.Controller)('jobskills'),
    __metadata("design:paramtypes", [jobskill_service_1.JobskillService])
], JobskillController);
//# sourceMappingURL=jobskill.controller.js.map