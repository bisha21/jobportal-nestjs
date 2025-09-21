import { Test, TestingModule } from '@nestjs/testing';
import { JobskillService } from './jobskill.service';

describe('JobskillService', () => {
  let service: JobskillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobskillService],
    }).compile();

    service = module.get<JobskillService>(JobskillService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
