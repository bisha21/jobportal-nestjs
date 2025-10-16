/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateFavoriteDto } from './dto/createFavoriteJob.dto';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class FavoriteService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly redis: RedisService,
  ) {}
  async addFavorite(dto: CreateFavoriteDto, userId: number) {
    const job = await this.prisma.job.findUnique({ where: { id: dto.jobId } });
    if (!job) throw new NotFoundException('Job not found');
    return this.prisma.favorite.create({ data: { userId, jobId: dto.jobId } });
  }

  async getFavorites(userId: number) {
    if (!userId) throw new NotFoundException('User not found');
    const cachedData = await this.redis.get(`favorites:${userId}`);
    if (cachedData) {
      return JSON.parse(cachedData) as Awaited<
        ReturnType<typeof this.prisma.favorite.findMany>
      >;
    }
    const favorites = await this.prisma.favorite.findMany({
      where: { userId },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            company: { select: { name: true } },
          },
        },
      },
    });
    await this.redis.set(`favorites:${userId}`, JSON.stringify(favorites), 600);
    return favorites;
  }

  async deleteFavorite(favoriteId: number) {
    const favorite = await this.prisma.favorite.findUnique({
      where: { id: favoriteId },
    });
    if (!favorite) throw new NotFoundException('Favorite not found');
    return this.prisma.favorite.delete({ where: { id: favoriteId } });
  }
}
