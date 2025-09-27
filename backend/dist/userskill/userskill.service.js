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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSkillService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let UserSkillService = class UserSkillService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUserSkill(userId, createUserSkillDto) {
        return this.prisma.userSkill.create({
            data: {
                userId,
                ...createUserSkillDto,
            },
            include: { user: true },
        });
    }
    async getUserSkills(userId) {
        return this.prisma.userSkill.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateUserSkill(skillId, updateUserSkillDto) {
        const skill = await this.prisma.userSkill.findUnique({
            where: { id: skillId },
        });
        if (!skill)
            throw new common_1.NotFoundException(`Skill with ID ${skillId} not found`);
        return this.prisma.userSkill.update({
            where: { id: skillId },
            data: updateUserSkillDto,
        });
    }
    async deleteUserSkill(skillId) {
        const skill = await this.prisma.userSkill.findUnique({
            where: { id: skillId },
        });
        if (!skill)
            throw new common_1.NotFoundException(`Skill with ID ${skillId} not found`);
        return this.prisma.userSkill.delete({ where: { id: skillId } });
    }
};
exports.UserSkillService = UserSkillService;
exports.UserSkillService = UserSkillService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], UserSkillService);
//# sourceMappingURL=userskill.service.js.map