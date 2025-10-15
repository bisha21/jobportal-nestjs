/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { JobService } from './job.service';
import { DatabaseService } from 'src/database/database.service';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { mockJobs } from './mock/job-mock';

const mockPrisma = {
  job: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  company: {
    findUnique: jest.fn(),
  },
};

describe('JobService', () => {
  let service: JobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobService,
        { provide: DatabaseService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<JobService>(JobService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createJob', () => {
    it('should create a job', async () => {
      mockPrisma.company.findUnique.mockResolvedValue({ id: 101 });
      mockPrisma.job.create.mockResolvedValue(mockJobs[0]);

      const result = await service.createJob({
        ...mockJobs[0],
      });

      expect(result).toEqual(mockJobs[0]);
      expect(mockPrisma.company.findUnique).toHaveBeenCalledWith({
        where: { id: mockJobs[0].companyId },
      });
    });

    it('should throw NotFoundException if company not found', async () => {
      mockPrisma.company.findUnique.mockResolvedValue(null);

      await expect(service.createJob({ ...mockJobs[0] })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getSingleJob', () => {
    it('should return a job', async () => {
      mockPrisma.job.findUnique.mockResolvedValue(mockJobs[0]);
      const result = await service.getSingleJob(1);
      expect(result).toEqual(mockJobs[0]);
    });

    it('should throw NotFoundException if job does not exist', async () => {
      mockPrisma.job.findUnique.mockResolvedValue(null);
      await expect(service.getSingleJob(999)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getAllJobs', () => {
    it('should return all jobs', async () => {
      mockPrisma.job.findMany.mockResolvedValue(mockJobs);
      const result = await service.getAllJobs({});
      expect(result).toEqual(mockJobs);
    });

    it('should throw InternalServerErrorException on error', async () => {
      mockPrisma.job.findMany.mockRejectedValue(new Error('DB error'));
      await expect(service.getAllJobs({})).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('updateJob', () => {
    it('should update a job', async () => {
      const updatedJob = { ...mockJobs[0], title: 'Updated Title' };
      mockPrisma.job.update.mockResolvedValue(updatedJob);

      const result = await service.updateJob(1, { title: 'Updated Title' });
      expect(result.title).toBe('Updated Title');
    });
  });

  describe('deleteJob', () => {
    it('should delete a job', async () => {
      mockPrisma.job.delete.mockResolvedValue(mockJobs[0]);
      const result = await service.deleteJob(1);
      expect(result).toEqual(mockJobs[0]);
    });
  });
});
