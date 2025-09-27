import { DatabaseService } from 'src/database/database.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { updateCategoryDto } from './dto/updateCategory.dto';
export declare class CategoryService {
    private prisma;
    constructor(prisma: DatabaseService);
    createCategory(createCategoryDto: CreateCategoryDto, userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        categoryName: string;
    }>;
    getCategories(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        categoryName: string;
    }[]>;
    getCategoryById(id: number): Promise<{
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
    updateCategory(id: number, updateCategoryDto: updateCategoryDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        categoryName: string;
    }>;
}
