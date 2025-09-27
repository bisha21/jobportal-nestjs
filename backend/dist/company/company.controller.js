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
exports.CompanyController = void 0;
const common_1 = require("@nestjs/common");
const company_service_1 = require("./company.service");
const auth_guard_1 = require("../common/guards/auth/auth.guard");
const createDto_1 = require("./dto/createDto");
const updateDto_1 = require("./dto/updateDto");
const role_guard_1 = require("../common/guards/role/role.guard");
const role_enum_1 = require("../common/guards/role/role.enum");
const role_decorator_1 = require("../common/guards/role/role.decorator");
const swagger_1 = require("@nestjs/swagger");
let CompanyController = class CompanyController {
    companyService;
    constructor(companyService) {
        this.companyService = companyService;
    }
    async createCompany(createCompanyDto, req) {
        const userId = req.user.id;
        return await this.companyService.createCompany(createCompanyDto, userId);
    }
    async getAllCompanies() {
        return await this.companyService.getAllCompanies();
    }
    async getCompanyById(companyId) {
        return await this.companyService.getCompanyById(companyId);
    }
    async updateCompany(companyId, updateCompanyDto, req) {
        const userId = req.user.id;
        return await this.companyService.updateCompany(companyId, updateCompanyDto, userId);
    }
    async deleteCompany(companyId, req) {
        const userId = req.user.id;
        return await this.companyService.deleteComapnyId(companyId, userId);
    }
};
exports.CompanyController = CompanyController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Role)(role_enum_1.Role.ADMIN, role_enum_1.Role.EMPLOYEE),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new company' }),
    (0, swagger_1.ApiBody)({ type: createDto_1.CreateCompanyDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Company successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden. Insufficient role.' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createDto_1.CreateCompanyDto, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "createCompany", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all companies' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all companies.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getAllCompanies", null);
__decorate([
    (0, common_1.Get)(':companyId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get company by ID' }),
    (0, swagger_1.ApiParam)({
        name: 'companyId',
        description: 'ID of the company',
        type: Number,
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Company found.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Company not found.' }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getCompanyById", null);
__decorate([
    (0, common_1.Patch)(':companyId'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Role)(role_enum_1.Role.EMPLOYEE, role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Update company details' }),
    (0, swagger_1.ApiParam)({
        name: 'companyId',
        description: 'ID of the company to update',
        type: Number,
    }),
    (0, swagger_1.ApiBody)({ type: updateDto_1.UpdateCompanyDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Company successfully updated.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden. Insufficient role.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Company not found.' }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateDto_1.UpdateCompanyDto, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "updateCompany", null);
__decorate([
    (0, common_1.Delete)(':companyId'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Role)(role_enum_1.Role.ADMIN, role_enum_1.Role.JOBSEEKER),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a company' }),
    (0, swagger_1.ApiParam)({
        name: 'companyId',
        description: 'ID of the company to delete',
        type: Number,
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Company successfully deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden. Insufficient role.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Company not found.' }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "deleteCompany", null);
exports.CompanyController = CompanyController = __decorate([
    (0, swagger_1.ApiTags)('Company'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('company'),
    __metadata("design:paramtypes", [company_service_1.CompanyService])
], CompanyController);
//# sourceMappingURL=company.controller.js.map