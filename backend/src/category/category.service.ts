/* eslint-disable prettier/prettier */

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { updateCategoryDto } from './dto/updateCategory.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: DatabaseService) {}
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
    return await this.prisma.category.findMany();
  }

  async getCategoryById(id: number) {
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
