import { Test, TestingModule } from '@nestjs/testing';
import { UserskillService } from './userskill.service';

describe('UserskillService', () => {
  let service: UserskillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserskillService],
    }).compile();

    service = module.get<UserskillService>(UserskillService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
