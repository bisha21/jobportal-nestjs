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
exports.CreateJobSkillsDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateJobSkillsDto {
    jobId;
    skill;
}
exports.CreateJobSkillsDto = CreateJobSkillsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the job', example: 1 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateJobSkillsDto.prototype, "jobId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Skill for the job',
        example: 'JavaScript',
        minLength: 2,
    }),
    (0, class_validator_1.IsNotEmpty)({ each: true }),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.MinLength)(2, { each: true }),
    __metadata("design:type", String)
], CreateJobSkillsDto.prototype, "skill", void 0);
//# sourceMappingURL=createjobskill.dto.js.map