import { CompanyService } from './company.service';
import { type RequestWithUser } from 'src/common/guards/auth/auth.guard';
import { CreateCompanyDto } from './dto/createDto';
import { UpdateCompanyDto } from './dto/updateDto';
import { SearchCompanyDto } from './dto/search-company';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    createCompany(createCompanyDto: CreateCompanyDto, req: RequestWithUser): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        location: string;
        website: string | null;
        industry: string;
        companySize: string;
        logoUrl: string | null;
        ownerId: number;
    }>;
    getAllCompanies(query: SearchCompanyDto, req: RequestWithUser): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        location: string;
        website: string | null;
        industry: string;
        companySize: string;
        logoUrl: string | null;
        ownerId: number;
    }[]>;
    updateCompany(companyId: number, updateCompanyDto: UpdateCompanyDto, req: RequestWithUser): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        location: string;
        website: string | null;
        industry: string;
        companySize: string;
        logoUrl: string | null;
        ownerId: number;
    }>;
    deleteCompany(companyId: number, req: RequestWithUser): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        location: string;
        website: string | null;
        industry: string;
        companySize: string;
        logoUrl: string | null;
        ownerId: number;
    }>;
}
