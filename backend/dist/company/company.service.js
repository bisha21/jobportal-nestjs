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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let CompanyService = class CompanyService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    validateOwnership(company, ownerId) {
        if (company.ownerId !== ownerId) {
            throw new common_1.ForbiddenException('You do not own this company');
        }
    }
    async createCompany(createCompanyDto, ownerId) {
        try {
            const existing = await this.prisma.company.findFirst({
                where: { name: createCompanyDto.name },
            });
            if (existing) {
                throw new common_1.ConflictException('Company with this name already exists');
            }
            return await this.prisma.company.create({
                data: {
                    ...createCompanyDto,
                    user: { connect: { id: ownerId } },
                },
            });
        }
        catch (error) {
            console.error('createCompany error:', error);
            if (error instanceof common_1.ConflictException)
                throw error;
            throw new common_1.InternalServerErrorException('Failed to create company');
        }
    }
    async getAllCompanies() {
        try {
            return await this.prisma.company.findMany();
        }
        catch (error) {
            console.error('getAllCompanies error:', error);
            throw new common_1.InternalServerErrorException('Failed to fetch companies');
        }
    }
    async getCompanyById(companyId) {
        try {
            const company = await this.prisma.company.findUnique({
                where: { id: companyId },
            });
            if (!company) {
                throw new common_1.NotFoundException('Company not found');
            }
            return company;
        }
        catch (error) {
            console.error('getCompanyById error:', error);
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new common_1.InternalServerErrorException('Failed to fetch company');
        }
    }
    async deleteComapnyId(companyId, ownerId) {
        try {
            const company = await this.prisma.company.findUnique({
                where: { id: companyId },
            });
            if (!company) {
                throw new common_1.NotFoundException('Company not found');
            }
            this.validateOwnership(company, ownerId);
            return await this.prisma.company.delete({
                where: { id: companyId },
            });
        }
        catch (error) {
            console.error('deleteComapnyId error:', error);
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new common_1.InternalServerErrorException('Failed to delete company');
        }
    }
    async updateCompany(companyId, updateCompanyDto, ownerId) {
        try {
            const company = await this.prisma.company.findUnique({
                where: { id: companyId },
            });
            if (!company) {
                throw new common_1.NotFoundException('Company not found');
            }
            this.validateOwnership(company, ownerId);
            return await this.prisma.company.update({
                where: { id: companyId },
                data: updateCompanyDto,
            });
        }
        catch (error) {
            console.error('updateCompany error:', error);
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.ForbiddenException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to update company');
        }
    }
    async updateCompanyLogo(companyId, logoUrl) {
        try {
            return await this.prisma.company.update({
                where: { id: companyId },
                data: { logoUrl: logoUrl },
            });
        }
        catch (error) {
            console.error('updateCompanyLogo error:', error);
            throw new common_1.InternalServerErrorException('Failed to update company logo');
        }
    }
};
exports.CompanyService = CompanyService;
exports.CompanyService = CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], CompanyService);
//# sourceMappingURL=company.service.js.map