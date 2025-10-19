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
        name: string;
        location: string;
        industry: string;
        companySize: string;
        website: string | null;
        ownerId: number;
        id: number;
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllCompanies(query: SearchCompanyDto, req: RequestWithUser): Promise<{
        description: string;
        name: string;
        location: string;
        industry: string;
        companySize: string;
        website: string | null;
        ownerId: number;
        id: number;
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    updateCompany(companyId: number, updateCompanyDto: UpdateCompanyDto, req: RequestWithUser): Promise<{
        description: string;
        name: string;
        location: string;
        industry: string;
        companySize: string;
        website: string | null;
        ownerId: number;
        id: number;
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteCompany(companyId: number, req: RequestWithUser): Promise<{
        description: string;
        name: string;
        location: string;
        industry: string;
        companySize: string;
        website: string | null;
        ownerId: number;
        id: number;
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
