import { DatabaseService } from 'src/database/database.service';
import { CreateFavoriteDto } from './dto/createFavoriteJob.dto';
export declare class FavoriteService {
    private readonly prisma;
    constructor(prisma: DatabaseService);
    addFavorite(dto: CreateFavoriteDto, userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jobId: number;
        userId: number;
    }>;
    getFavorites(userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jobId: number;
        userId: number;
    }[]>;
    deleteFavorite(favoriteId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jobId: number;
        userId: number;
    }>;
}
