import { Test, TestingModule } from '@nestjs/testing';
import { JobskillController } from './jobskill.controller';

describe('JobskillController', () => {
  let controller: JobskillController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobskillController],
    }).compile();

    controller = module.get<JobskillController>(JobskillController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
