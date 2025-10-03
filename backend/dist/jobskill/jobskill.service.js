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
exports.JobskillService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let JobskillService = class JobskillService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createJobSkills(dto) {
        const job = await this.prisma.job.findUnique({
            where: { id: dto.jobId },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        const skillData = dto.skills.map((skill) => ({
            jobId: dto.jobId,
            skill,
        }));
        await this.prisma.jobSkill.createMany({
            data: skillData,
            skipDuplicates: true,
        });
        return this.prisma.job.findUnique({
            where: { id: dto.jobId },
            include: { jobSkills: true },
        });
    }
    async getJobSkills(jobId) {
        const job = await this.prisma.job.findUnique({ where: { id: jobId } });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        return this.prisma.jobSkill.findMany({
            where: { jobId },
        });
    }
    async updateJobSkills(skillId, updateJobSkillDto) {
        const skill = await this.prisma.jobSkill.findUnique({
            where: { id: skillId },
        });
        if (!skill)
            throw new common_1.NotFoundException('Skill not found');
        return this.prisma.jobSkill.update({
            where: { id: skillId },
            data: updateJobSkillDto,
        });
    }
    async deleteJobSkills(skillId) {
        const skill = await this.prisma.jobSkill.findUnique({
            where: { id: skillId },
        });
        if (!skill)
            throw new common_1.NotFoundException('Skill not found');
        return this.prisma.jobSkill.delete({ where: { id: skillId } });
    }
};
exports.JobskillService = JobskillService;
exports.JobskillService = JobskillService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], JobskillService);
//# sourceMappingURL=jobskill.service.js.map