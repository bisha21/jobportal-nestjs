import { CompanyService } from './company.service';
import { type RequestWithUser } from 'src/common/guards/auth/auth.guard';
import { CreateCompanyDto } from './dto/createDto';
import { UpdateCompanyDto } from './dto/updateDto';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    createCompany(createCompanyDto: CreateCompanyDto, req: RequestWithUser): Promise<{
        name: string;
        description: string;
        location: string;
        website: string | null;
        industry: string;
        companySize: string;
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        ownerId: number;
    }>;
    getAllCompanies(): Promise<{
        name: string;
        description: string;
        location: string;
        website: string | null;
        industry: string;
        companySize: string;
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        ownerId: number;
    }[]>;
    getCompanyById(companyId: number): Promise<{
        name: string;
        description: string;
        location: string;
        website: string | null;
        industry: string;
        companySize: string;
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        ownerId: number;
    }>;
    updateCompany(companyId: number, updateCompanyDto: UpdateCompanyDto, req: RequestWithUser): Promise<{
        name: string;
        description: string;
        location: string;
        website: string | null;
        industry: string;
        companySize: string;
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        ownerId: number;
    }>;
    deleteCompany(companyId: number, req: RequestWithUser): Promise<{
        name: string;
        description: string;
        location: string;
        website: string | null;
        industry: string;
        companySize: string;
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        ownerId: number;
    }>;
}
