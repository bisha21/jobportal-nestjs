import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateFavoriteDto } from './dto/createFavoriteJob.dto';

@Injectable()
export class FavoriteService {
  constructor(private readonly prisma: DatabaseService) {}
  async addFavorite(dto: CreateFavoriteDto, userId: number) {
    const job = await this.prisma.job.findUnique({ where: { id: dto.jobId } });
    if (!job) throw new NotFoundException('Job not found');
    return this.prisma.favorite.create({ data: { userId, jobId: dto.jobId } });
  }

  async getFavorites(userId: number) {
    return this.prisma.favorite.findMany({ where: { userId } });
  }

  async deleteFavorite(favoriteId: number) {
    const favorite = await this.prisma.favorite.findUnique({
      where: { id: favoriteId },
    });
    if (!favorite) throw new NotFoundException('Favorite not found');
    return this.prisma.favorite.delete({ where: { id: favoriteId } });
  }
}
