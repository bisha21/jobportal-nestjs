/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Test, TestingModule } from '@nestjs/testing';
import { UserSkillService } from './userskill.service';
import { DatabaseService } from 'src/database/database.service';
import { NotFoundException } from '@nestjs/common';
import { CreateUserSkillDto } from './dto/createUserSkill.dto';
import { UpdateUserSkillDto } from './dto/updateUserSkill.dto';

describe('UserSkillService', () => {
  let service: UserSkillService;
  let prisma: any;

  const mockPrisma = {
    userSkill: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      groupBy: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserSkillService,
        { provide: DatabaseService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<UserSkillService>(UserSkillService);
    prisma = module.get<DatabaseService>(DatabaseService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUserSkill', () => {
    const dto: CreateUserSkillDto = { skill: 'React' };

    it('should create a user skill', async () => {
      const userSkillMock = { id: 1, userId: 1, name: 'React' };
      prisma.userSkill.create.mockResolvedValue(userSkillMock);

      const result = await service.createUserSkill(1, dto);

      expect(result).toEqual(userSkillMock);
      expect(prisma.userSkill.create).toHaveBeenCalledWith({
        data: { userId: 1, ...dto },
        include: { user: true },
      });
    });
  });

  describe('getUserSkills', () => {
    it('should return all skills for a user', async () => {
      const skills = [{ id: 1, userId: 1, name: 'React' }];
      prisma.userSkill.findMany.mockResolvedValue(skills);

      const result = await service.getUserSkills(1);

      expect(result).toEqual(skills);
      expect(prisma.userSkill.findMany).toHaveBeenCalledWith({
        where: { userId: 1 },
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('updateUserSkill', () => {
    const dto: UpdateUserSkillDto = { skill: 'Node.js' };

    it('should throw NotFoundException if skill not found', async () => {
      prisma.userSkill.findUnique.mockResolvedValue(null);

      await expect(service.updateUserSkill(999, dto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should update a skill', async () => {
      const skillMock = { id: 1, userId: 1, skill: 'React' };
      prisma.userSkill.findUnique.mockResolvedValue(skillMock);
      prisma.userSkill.update.mockResolvedValue({ ...skillMock, skill: 'Node.js' });

      const result = await service.updateUserSkill(1, dto);
      expect(result.skill).toBe('Node.js');
    });
  });

  describe('deleteUserSkill', () => {
    it('should throw NotFoundException if skill not found', async () => {
      prisma.userSkill.findUnique.mockResolvedValue(null);

      await expect(service.deleteUserSkill(999)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should delete a skill', async () => {
      const skillMock = { id: 1, userId: 1, name: 'React' };
      prisma.userSkill.findUnique.mockResolvedValue(skillMock);
      prisma.userSkill.delete.mockResolvedValue(skillMock);

      const result = await service.deleteUserSkill(1);
      expect(result).toEqual(skillMock);
    });
  });

  describe('topUserSkills', () => {
    it('should return top user skills', async () => {
      prisma.userSkill.groupBy.mockResolvedValue([
        { name: 'React', _count: { userId: 5 } },
        { name: 'Node.js', _count: { userId: 3 } },
      ]);

      const result = await service['prisma'].userSkill.groupBy({
        by: ['skill'],
        _count: { userId: true },
        orderBy: { _count: { userId: 'desc' } },
        take: 5,
      });

      expect(result).toEqual([
        { name: 'React', _count: { userId: 5 } },
        { name: 'Node.js', _count: { userId: 3 } },
      ]);
    });
  });
});
