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
exports.CreateCompanyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateCompanyDto {
    name;
    description;
    location;
    website;
    industry;
    companySize;
    logoUrl;
    createdAt = new Date().toISOString();
}
exports.CreateCompanyDto = CreateCompanyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Company name', example: 'Tech Solutions' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Description of the company',
        example: 'We build software',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Location of the company',
        example: 'Kathmandu, Nepal',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Company website',
        example: 'https://techsolutions.com',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "website", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Industry of the company',
        example: 'Software Development',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "industry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Size of the company',
        example: '50-100 employees',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "companySize", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Logo URL',
        example: 'https://techsolutions.com/logo.png',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "logoUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Created at timestamp',
        example: new Date().toISOString(),
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "createdAt", void 0);
//# sourceMappingURL=createDto.js.map