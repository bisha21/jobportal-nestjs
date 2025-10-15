/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteService } from './favorite.service';
import { DatabaseService } from 'src/database/database.service';
import { NotFoundException } from '@nestjs/common';

const mockPrisma = {
  job: { findUnique: jest.fn() },
  favorite: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
};

describe('FavoriteService', () => {
  let service: FavoriteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoriteService,
        { provide: DatabaseService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<FavoriteService>(FavoriteService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addFavorite', () => {
    it('should add a favorite job', async () => {
      const dto = { jobId: 1 };
      const userId = 123;

      mockPrisma.job.findUnique.mockResolvedValue({ id: 1, title: 'Test Job' });
      mockPrisma.favorite.create.mockResolvedValue({ id: 1, userId, jobId: 1 });

      const result = await service.addFavorite(dto, userId);
      expect(result).toEqual({ id: 1, userId, jobId: 1 });
      expect(mockPrisma.job.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockPrisma.favorite.create).toHaveBeenCalledWith({
        data: { userId, jobId: 1 },
      });
    });

    it('should throw NotFoundException if job does not exist', async () => {
      mockPrisma.job.findUnique.mockResolvedValue(null);
      await expect(service.addFavorite({ jobId: 999 }, 123)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getFavorites', () => {
    it('should return favorite jobs for a user', async () => {
      const userId = 123;
      const favorites = [
        {
          id: 1,
          userId,
          job: { id: 1, title: 'Job 1', company: { name: 'Company A' } },
        },
      ];
      mockPrisma.favorite.findMany.mockResolvedValue(favorites);

      const result = await service.getFavorites(userId);
      expect(result).toEqual(favorites);
      expect(mockPrisma.favorite.findMany).toHaveBeenCalledWith({
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
    });
  });

  describe('deleteFavorite', () => {
    it('should delete a favorite job', async () => {
      const favoriteId = 1;
      mockPrisma.favorite.findUnique.mockResolvedValue({ id: favoriteId });
      mockPrisma.favorite.delete.mockResolvedValue({ id: favoriteId });

      const result = await service.deleteFavorite(favoriteId);
      expect(result).toEqual({ id: favoriteId });
      expect(mockPrisma.favorite.findUnique).toHaveBeenCalledWith({
        where: { id: favoriteId },
      });
      expect(mockPrisma.favorite.delete).toHaveBeenCalledWith({
        where: { id: favoriteId },
      });
    });

    it('should throw NotFoundException if favorite does not exist', async () => {
      mockPrisma.favorite.findUnique.mockResolvedValue(null);
      await expect(service.deleteFavorite(999)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
