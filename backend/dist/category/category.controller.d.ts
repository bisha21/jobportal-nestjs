import { CategoryService } from './category.service';
import { type RequestWithUser } from 'src/common/guards/auth/auth.guard';
import { CreateCategoryDto } from './dto/createCategory.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getCategories(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        categoryName: string;
    }[]>;
    createCategory(createCategoryDto: CreateCategoryDto, req: RequestWithUser): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        categoryName: string;
    }>;
    getCategoryById(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        categoryName: string;
    }>;
    updateCategory(id: number, updateCategoryDto: CreateCategoryDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        categoryName: string;
    }>;
    deleteCategory(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        categoryName: string;
    }>;
}
