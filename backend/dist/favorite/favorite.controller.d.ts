import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/createFavoriteJob.dto';
import { type RequestWithUser } from 'src/common/guards/auth/auth.guard';
export declare class FavoriteController {
    private readonly favoriteService;
    constructor(favoriteService: FavoriteService);
    addFavorite(dto: CreateFavoriteDto, req: RequestWithUser): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jobId: number;
        userId: number;
    }>;
    getFavorites(req: RequestWithUser): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jobId: number;
        userId: number;
    }[]>;
    deleteFavorite(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jobId: number;
        userId: number;
    }>;
}
