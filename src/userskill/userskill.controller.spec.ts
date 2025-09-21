import { Test, TestingModule } from '@nestjs/testing';
import { UserskillController } from './userskill.controller';

describe('UserskillController', () => {
  let controller: UserskillController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserskillController],
    }).compile();

    controller = module.get<UserskillController>(UserskillController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
