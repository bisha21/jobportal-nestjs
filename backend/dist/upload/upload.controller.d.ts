import { AuthService } from 'src/auth/auth.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary/cloudinary.service';
import { type RequestWithUser } from 'src/common/guards/auth/auth.guard';
import { CompanyService } from 'src/company/company.service';
export declare class UploadController {
    private readonly cloudinaryService;
    private readonly authService;
    private readonly companyService;
    constructor(cloudinaryService: CloudinaryService, authService: AuthService, companyService: CompanyService);
    uploadProfilePicture(file: Express.Multer.File, req: RequestWithUser): Promise<{
        message: string;
        url: string;
    }>;
    uploadCompanyLogo(file: Express.Multer.File, req: RequestWithUser, companyId: number): Promise<{
        message: string;
        url: string;
    }>;
}
