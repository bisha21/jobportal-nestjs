/* eslint-disable prettier/prettier */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { updateCategoryDto } from './dto/updateCategory.dto';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class CategoryService {
  constructor(
    private prisma: DatabaseService,
    private redis: RedisService,
  ) {}
  async createCategory(createCategoryDto: CreateCategoryDto, userId: number) {
    const category = await this.prisma.category.findFirst({
      where: { categoryName: createCategoryDto.categoryName },
    });

    if (category) {
      throw new ConflictException('Category already exist');
    }
    return this.prisma.category.create({
      data: {
        categoryName: createCategoryDto.categoryName,
        userId: userId,
      },
    });
  }

  async getCategories() {
    const cachedCategories = await this.redis.get('categories:all');
    if (cachedCategories)
      return JSON.parse(cachedCategories) as ReturnType<
        typeof this.prisma.category.findMany
      >;
    const user = await this.prisma.category.findMany({
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    });

    await this.redis.set('categories:all', JSON.stringify(user), 600);
    return user;
  }

  async getCategoryById(id: number) {
    const cachedCategory = await this.redis.get(`category:${id}`);
    if (cachedCategory)
      return JSON.parse(cachedCategory) as ReturnType<
        typeof this.prisma.category.findUnique
      >;
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async deleteCategory(id: number) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    return this.prisma.category.delete({ where: { id } });
  }

  async updateCategory(id: number, updateCategoryDto: updateCategoryDto) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    return this.prisma.category.update({
      where: { id },
      data: {
        categoryName: updateCategoryDto.categoryName,
      },
    });
  }
}
