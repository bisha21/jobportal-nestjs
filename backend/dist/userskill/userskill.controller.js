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
exports.UserSkillController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const userskill_service_1 = require("./userskill.service");
const createUserSkill_dto_1 = require("./dto/createUserSkill.dto");
const updateUserSkill_dto_1 = require("./dto/updateUserSkill.dto");
const auth_guard_1 = require("../common/guards/auth/auth.guard");
let UserSkillController = class UserSkillController {
    userSkillService;
    constructor(userSkillService) {
        this.userSkillService = userSkillService;
    }
    async createUserSkill(createUserSkillDto, req) {
        return this.userSkillService.createUserSkill(req.user.id, createUserSkillDto);
    }
    async getUserSkills(req) {
        const userId = req.user.id;
        return this.userSkillService.getUserSkills(userId);
    }
    async updateUserSkill(skillId, updateUserSkillDto) {
        return this.userSkillService.updateUserSkill(skillId, updateUserSkillDto);
    }
    async deleteUserSkill(skillId) {
        return this.userSkillService.deleteUserSkill(skillId);
    }
};
exports.UserSkillController = UserSkillController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new skill for the authenticated user' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Skill created successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUserSkill_dto_1.CreateUserSkillDto, Object]),
    __metadata("design:returntype", Promise)
], UserSkillController.prototype, "createUserSkill", null);
__decorate([
    (0, common_1.Get)(''),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get all skills of the authenticated user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of user skills returned.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserSkillController.prototype, "getUserSkills", null);
__decorate([
    (0, common_1.Put)(':skillId'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Update a specific skill by skillId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Skill updated successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Skill not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('skillId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateUserSkill_dto_1.UpdateUserSkillDto]),
    __metadata("design:returntype", Promise)
], UserSkillController.prototype, "updateUserSkill", null);
__decorate([
    (0, common_1.Delete)(':skillId'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a specific skill by skillId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Skill deleted successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Skill not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('skillId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserSkillController.prototype, "deleteUserSkill", null);
exports.UserSkillController = UserSkillController = __decorate([
    (0, swagger_1.ApiTags)('User Skills'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('userskills'),
    __metadata("design:paramtypes", [userskill_service_1.UserSkillService])
], UserSkillController);
//# sourceMappingURL=userskill.controller.js.map