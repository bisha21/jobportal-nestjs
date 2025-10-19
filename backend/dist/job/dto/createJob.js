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
exports.CreateJobDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const prisma_1 = require("../../../generated/prisma");
class CreateJobDto {
    title;
    description;
    position;
    location;
    experience;
    salaryMin;
    salaryMax;
    type;
    deadline;
    companyId;
    categoryId;
}
exports.CreateJobDto = CreateJobDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Title of the job', example: 'Frontend Developer' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateJobDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Job description', example: 'Develop and maintain UI' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateJobDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Position name', example: 'Senior Developer' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateJobDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Location of the job', example: 'Remote' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateJobDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Experience required', example: '2-3 years' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateJobDto.prototype, "experience", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Minimum salary', example: 30000 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateJobDto.prototype, "salaryMin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Maximum salary', example: 50000 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateJobDto.prototype, "salaryMax", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Type of job', enum: prisma_1.JobType, example: prisma_1.JobType.FULLTIME }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(prisma_1.JobType),
    __metadata("design:type", String)
], CreateJobDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Application deadline', example: '2025-12-31T23:59:59Z' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateJobDto.prototype, "deadline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Company ID for the job', example: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateJobDto.prototype, "companyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Category ID for the job', example: 2 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateJobDto.prototype, "categoryId", void 0);
//# sourceMappingURL=createJob.js.map