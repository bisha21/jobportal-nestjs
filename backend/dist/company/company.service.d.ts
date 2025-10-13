import { DatabaseService } from 'src/database/database.service';
import { CreateCompanyDto } from './dto/createDto';
import { UpdateCompanyDto } from './dto/updateDto';
import { SearchCompanyDto } from './dto/search-company';
import { User } from 'generated/prisma';
export declare class CompanyService {
    private prisma;
    constructor(prisma: DatabaseService);
    private validateOwnership;
    createCompany(createCompanyDto: CreateCompanyDto, ownerId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        location: string;
        website: string | null;
        industry: string;
        companySize: string;
        logoUrl: string | null;
        ownerId: number;
    }>;
    getAllCompanies(user: User, query: SearchCompanyDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        location: string;
        website: string | null;
        industry: string;
        companySize: string;
        logoUrl: string | null;
        ownerId: number;
    }[]>;
    getCompanyById(companyId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        location: string;
        website: string | null;
        industry: string;
        companySize: string;
        logoUrl: string | null;
        ownerId: number;
    }>;
    deleteComapnyId(companyId: number, ownerId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        location: string;
        website: string | null;
        industry: string;
        companySize: string;
        logoUrl: string | null;
        ownerId: number;
    }>;
    updateCompany(companyId: number, updateCompanyDto: UpdateCompanyDto, ownerId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        location: string;
        website: string | null;
        industry: string;
        companySize: string;
        logoUrl: string | null;
        ownerId: number;
    }>;
    updateCompanyLogo(companyId: number, logoUrl: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        location: string;
        website: string | null;
        industry: string;
        companySize: string;
        logoUrl: string | null;
        ownerId: number;
    }>;
}
