/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationService } from './application.service';
import { DatabaseService } from 'src/database/database.service';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationGateway } from 'src/notification/notification.gateway';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { CreateApplicationDto } from './dto/applyApplication.dto';

describe('ApplicationService', () => {
  let service: ApplicationService;

  const mockPrisma = {
    job: { findUnique: jest.fn() },
    company: { findUnique: jest.fn() },
    application: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findFirst: jest.fn(),
    },
  };

  const mockNotificationService = { createNotification: jest.fn() };
  const mockNotificationGateway = {
    server: { to: jest.fn().mockReturnThis(), emit: jest.fn() },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicationService,
        { provide: DatabaseService, useValue: mockPrisma },
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: NotificationGateway, useValue: mockNotificationGateway },
      ],
    }).compile();

    service = module.get<ApplicationService>(ApplicationService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('applyJob', () => {
    const dto: CreateApplicationDto = {
      resumeUrl: 'resume.pdf',
    };

    it('should throw NotFoundException if job not found', async () => {
      mockPrisma.job.findUnique.mockResolvedValue(null);
      await expect(service.applyJob(1, 1, dto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if company not found', async () => {
      mockPrisma.job.findUnique.mockResolvedValue({
        id: 1,
        title: 'Job',
        companyId: 2,
      });
      mockPrisma.company.findUnique.mockResolvedValue(null);
      await expect(service.applyJob(1, 1, dto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should create application and send notification', async () => {
      mockPrisma.job.findUnique.mockResolvedValue({
        id: 1,
        title: 'Job',
        companyId: 2,
      });
      mockPrisma.company.findUnique.mockResolvedValue({ id: 2, ownerId: 99 });
      mockPrisma.application.create.mockResolvedValue({ id: 1, ...dto });

      const result = await service.applyJob(1, 1, dto);

      expect(mockPrisma.application.create).toHaveBeenCalledWith({
        data: { userId: 1, jobId: 1, ...dto },
      });
      expect(mockNotificationService.createNotification).toHaveBeenCalledWith({
        userId: 99,
        type: 'New Application',
        message: expect.any(String),
      });
      expect(mockNotificationGateway.server.to).toHaveBeenCalledWith('user_99');
      expect(result).toEqual({ id: 1, ...dto });
    });

    it('should throw ConflictException if already applied', async () => {
      mockPrisma.job.findUnique.mockResolvedValue({
        id: 1,
        title: 'Job',
        companyId: 2,
      });
      mockPrisma.company.findUnique.mockResolvedValue({ id: 2, ownerId: 99 });
      mockPrisma.application.create.mockRejectedValue({ code: 'P2002' });

      await expect(service.applyJob(1, 1, dto)).rejects.toThrow(
        ConflictException,
      );
    });
  });
});
