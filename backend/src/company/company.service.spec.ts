/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { DatabaseService } from 'src/database/database.service';
import {
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/createDto';
import { UpdateCompanyDto } from './dto/updateDto';

describe('CompanyService', () => {
  let service: CompanyService;

  const mockPrisma = {
    company: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        { provide: DatabaseService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCompany', () => {
    const dto: CreateCompanyDto = { name: 'Test Company', description: 'desc' };

    it('should create a company', async () => {
      mockPrisma.company.findFirst.mockResolvedValue(null);
      mockPrisma.company.create.mockResolvedValue({
        id: 1,
        ...dto,
        ownerId: 1,
      });

      const result = await service.createCompany(dto, 1);

      expect(result).toEqual({ id: 1, ...dto, ownerId: 1 });
      expect(mockPrisma.company.create).toHaveBeenCalledWith({
        data: { ...dto, user: { connect: { id: 1 } } },
      });
    });

    it('should throw ConflictException if company exists', async () => {
      mockPrisma.company.findFirst.mockResolvedValue({ id: 1, ...dto });
      await expect(service.createCompany(dto, 1)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('getAllCompanies', () => {
    it('should return companies for EMPLOYEE', async () => {
      const user = { id: 1, role: 'EMPLOYEE' };
      mockPrisma.company.findMany.mockResolvedValue([
        { id: 1, name: 'Company 1', ownerId: 1 },
      ]);

      const result = await service.getAllCompanies(user, {});

      expect(result).toEqual([{ id: 1, name: 'Company 1', ownerId: 1 }]);
    });

    it('should return companies filtered by ownerId for ADMIN', async () => {
      const user = { id: 99, role: 'ADMIN' };
      mockPrisma.company.findMany.mockResolvedValue([
        { id: 2, name: 'Company 2', ownerId: 1 },
      ]);

      const result = await service.getAllCompanies(user, { ownerId: 1 });
      expect(result).toEqual([{ id: 2, name: 'Company 2', ownerId: 1 }]);
    });
  });

  describe('getCompanyById', () => {
    it('should return company if found', async () => {
      mockPrisma.company.findUnique.mockResolvedValue({
        id: 1,
        name: 'Company',
      });
      const result = await service.getCompanyById(1);
      expect(result).toEqual({ id: 1, name: 'Company' });
    });

    it('should throw NotFoundException if not found', async () => {
      mockPrisma.company.findUnique.mockResolvedValue(null);
      await expect(service.getCompanyById(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteComapnyId', () => {
    it('should delete company if owner', async () => {
      const company = { id: 1, ownerId: 1 };
      mockPrisma.company.findUnique.mockResolvedValue(company);
      mockPrisma.company.delete.mockResolvedValue(company);

      const result = await service.deleteComapnyId(1, 1);
      expect(result).toEqual(company);
      expect(mockPrisma.company.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    // it('should throw ForbiddenException if not owner', async () => {
    //   const company = { id: 1, ownerId: 2 };
    //   mockPrisma.company.findUnique.mockResolvedValue(company);
    //   await expect(service.deleteComapnyId(1, 1)).rejects.toThrow(
    //     ForbiddenException,
    //   );
    // });

    it('should throw NotFoundException if company not found', async () => {
      mockPrisma.company.findUnique.mockResolvedValue(null);
      await expect(service.deleteComapnyId(1, 1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateCompany', () => {
    const dto: UpdateCompanyDto = { description: 'Updated' };

    it('should update company if owner', async () => {
      const company = { id: 1, ownerId: 1 };
      mockPrisma.company.findUnique.mockResolvedValue(company);
      mockPrisma.company.update.mockResolvedValue({ ...company, ...dto });

      const result = await service.updateCompany(1, dto, 1);
      expect(result).toEqual({ ...company, ...dto });
    });

    it('should throw ForbiddenException if not owner', async () => {
      const company = { id: 1, ownerId: 2 };
      mockPrisma.company.findUnique.mockResolvedValue(company);
      await expect(service.updateCompany(1, dto, 1)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should throw NotFoundException if company not found', async () => {
      mockPrisma.company.findUnique.mockResolvedValue(null);
      await expect(service.updateCompany(1, dto, 1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateCompanyLogo', () => {
    it('should update logo', async () => {
      const updated = { id: 1, logoUrl: 'logo.png' };
      mockPrisma.company.update.mockResolvedValue(updated);

      const result = await service.updateCompanyLogo(1, 'logo.png');
      expect(result).toEqual(updated);
      expect(mockPrisma.company.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { logoUrl: 'logo.png' },
      });
    });
  });
});
