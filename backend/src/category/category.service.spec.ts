/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { DatabaseService } from 'src/database/database.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { updateCategoryDto } from './dto/updateCategory.dto';

// Mock Prisma (DatabaseService)
const mockPrisma = {
  category: {
    findFirst: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        { provide: DatabaseService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCategory', () => {
    it('should create a new category successfully', async () => {
      mockPrisma.category.findFirst.mockResolvedValue(null);
      mockPrisma.category.create.mockResolvedValue({
        id: 1,
        categoryName: 'Tech',
        userId: 1,
      });

      const createCategoryDto: CreateCategoryDto = { categoryName: 'Tech' };
      const result = await service.createCategory(createCategoryDto, 1);

      expect(mockPrisma.category.findFirst).toHaveBeenCalledWith({
        where: { categoryName: 'Tech' },
      });
      expect(mockPrisma.category.create).toHaveBeenCalledWith({
        data: { categoryName: 'Tech', userId: 1 },
      });
      expect(result).toEqual({ id: 1, categoryName: 'Tech', userId: 1 });
    });

    it('should throw ConflictException if category already exists', async () => {
      mockPrisma.category.findFirst.mockResolvedValue({
        id: 1,
        categoryName: 'Tech',
      });

      const createCategoryDto: CreateCategoryDto = { categoryName: 'Tech' };
      await expect(
        service.createCategory(createCategoryDto, 1),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('getCategories', () => {
    it('should return all categories', async () => {
      mockPrisma.category.findMany.mockResolvedValue([
        {
          id: 1,
          categoryName: 'Tech',
          user: { id: 1, fullName: 'User', email: 'user@test.com' },
        },
      ]);

      const result = await service.getCategories();
      expect(mockPrisma.category.findMany).toHaveBeenCalledWith({
        include: {
          user: { select: { id: true, fullName: true, email: true } },
        },
      });
      expect(result).toHaveLength(1);
      expect(result[0].categoryName).toBe('Tech');
    });
  });

  describe('getCategoryById', () => {
    it('should return a category by ID', async () => {
      mockPrisma.category.findUnique.mockResolvedValue({
        id: 1,
        categoryName: 'Tech',
      });

      const result = await service.getCategoryById(1);
      expect(mockPrisma.category.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result.categoryName).toBe('Tech');
    });

    it('should throw NotFoundException if category not found', async () => {
      mockPrisma.category.findUnique.mockResolvedValue(null);
      await expect(service.getCategoryById(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateCategory', () => {
    it('should update a category successfully', async () => {
      mockPrisma.category.findUnique.mockResolvedValue({
        id: 1,
        categoryName: 'Tech',
      });
      mockPrisma.category.update.mockResolvedValue({
        id: 1,
        categoryName: 'Science',
      });

      const updateDto: updateCategoryDto = { categoryName: 'Science' };
      const result = await service.updateCategory(1, updateDto);

      expect(mockPrisma.category.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { categoryName: 'Science' },
      });
      expect(result.categoryName).toBe('Science');
    });

    it('should throw NotFoundException if category to update does not exist', async () => {
      mockPrisma.category.findUnique.mockResolvedValue(null);
      const updateDto: updateCategoryDto = { categoryName: 'Science' };
      await expect(service.updateCategory(1, updateDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteCategory', () => {
    it('should delete a category successfully', async () => {
      mockPrisma.category.findUnique.mockResolvedValue({
        id: 1,
        categoryName: 'Tech',
      });
      mockPrisma.category.delete.mockResolvedValue({
        id: 1,
        categoryName: 'Tech',
      });

      const result = await service.deleteCategory(1);
      expect(mockPrisma.category.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result.categoryName).toBe('Tech');
    });

    it('should throw NotFoundException if category to delete does not exist', async () => {
      mockPrisma.category.findUnique.mockResolvedValue(null);
      await expect(service.deleteCategory(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
