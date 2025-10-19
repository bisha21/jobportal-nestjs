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
exports.SearchJobDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class SearchJobDto {
    title;
    location;
    jobType;
    companyId;
    categoryId;
    salaryMin;
    salaryMax;
    page;
    limit;
    sort;
    fields;
    include;
    ownerId;
}
exports.SearchJobDto = SearchJobDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by job title',
        example: 'Frontend Developer',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchJobDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by job location',
        example: 'Remote',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchJobDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by job type',
        example: 'FULLTIME',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchJobDto.prototype, "jobType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by company ID', example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SearchJobDto.prototype, "companyId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by category ID', example: 2 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SearchJobDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by minimum salary',
        example: 30000,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SearchJobDto.prototype, "salaryMin", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by maximum salary',
        example: 50000,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SearchJobDto.prototype, "salaryMax", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Pagination page number', example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SearchJobDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Pagination limit per page',
        example: 10,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SearchJobDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Sorting field', example: 'salaryMax' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchJobDto.prototype, "sort", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Fields to include in response',
        example: 'title,companyId',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchJobDto.prototype, "fields", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Relations to include',
        example: 'company,category',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchJobDto.prototype, "include", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by owner ID (company owner)',
        example: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SearchJobDto.prototype, "ownerId", void 0);
//# sourceMappingURL=searchJob.dto.js.map