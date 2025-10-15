/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { JobskillService } from './jobskill.service';
import { DatabaseService } from 'src/database/database.service';
import { NotFoundException } from '@nestjs/common';
import { CreateJobSkillsDto } from './dto/createjobskill.dto';
import { UpdateJobSkillDto } from './dto/updatejobskill.dto';

describe('JobskillService', () => {
  let service: JobskillService;

  const mockPrisma = {
    job: {
      findUnique: jest.fn(),
    },
    jobSkill: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      groupBy: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobskillService,
        { provide: DatabaseService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<JobskillService>(JobskillService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createJobSkill', () => {
    const dto: CreateJobSkillsDto = { jobId: 1, skill: 'React' };

    it('should throw NotFoundException if job not found', async () => {
      mockPrisma.job.findUnique.mockResolvedValue(null);

      await expect(service.createJobSkill(dto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should create a job skill and return job with jobSkills', async () => {
      const jobMock = { id: 1 };
      const jobWithSkills = { id: 1, jobSkills: [{ id: 1, skill: 'React' }] };

      mockPrisma.job.findUnique
        .mockResolvedValueOnce(jobMock) // check job exists
        .mockResolvedValueOnce(jobWithSkills); // return job with skills
      mockPrisma.jobSkill.create.mockResolvedValue({ id: 1, ...dto });

      const result = await service.createJobSkill(dto);

      expect(mockPrisma.jobSkill.create).toHaveBeenCalledWith({
        data: { jobId: 1, skill: 'React' },
      });
      expect(result).toEqual(jobWithSkills);
    });
  });

  describe('getJobSkills', () => {
    it('should throw NotFoundException if job not found', async () => {
      mockPrisma.job.findUnique.mockResolvedValue(null);
      await expect(service.getJobSkills(1)).rejects.toThrow(NotFoundException);
    });

    it('should return job skills', async () => {
      mockPrisma.job.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.jobSkill.findMany.mockResolvedValue([
        { id: 1, skill: 'React', jobId: 1 },
      ]);

      const result = await service.getJobSkills(1);
      expect(result).toHaveLength(1);
      expect(result[0].skill).toBe('React');
    });
  });

  describe('updateJobSkills', () => {
    const dto: UpdateJobSkillDto = { skill: 'Node.js' };

    it('should throw NotFoundException if skill not found', async () => {
      mockPrisma.jobSkill.findUnique.mockResolvedValue(null);
      await expect(service.updateJobSkills(1, dto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should update skill', async () => {
      const skillMock = { id: 1, skill: 'React' };
      mockPrisma.jobSkill.findUnique.mockResolvedValue(skillMock);
      mockPrisma.jobSkill.update.mockResolvedValue({ id: 1, skill: 'Node.js' });

      const result = await service.updateJobSkills(1, dto);
      expect(result.skill).toBe('Node.js');
    });
  });

  describe('deleteJobSkills', () => {
    it('should throw NotFoundException if skill not found', async () => {
      mockPrisma.jobSkill.findUnique.mockResolvedValue(null);
      await expect(service.deleteJobSkills(1)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should delete skill', async () => {
      const skillMock = { id: 1, skill: 'React' };
      mockPrisma.jobSkill.findUnique.mockResolvedValue(skillMock);
      mockPrisma.jobSkill.delete.mockResolvedValue(skillMock);

      const result = await service.deleteJobSkills(1);
      expect(result.skill).toBe('React');
    });
  });

  describe('topSkills', () => {
    it('should return top skills', async () => {
      mockPrisma.jobSkill.groupBy.mockResolvedValue([
        { skill: 'React', _count: { jobId: 5 } },
        { skill: 'Node.js', _count: { jobId: 3 } },
      ]);

      const result = await service.topSkills();
      expect(result).toEqual([
        { skill: 'React', demand: 5, jobs: 5 },
        { skill: 'Node.js', demand: 3, jobs: 3 },
      ]);
    });
  });
});
