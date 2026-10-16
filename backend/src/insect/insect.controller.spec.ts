import { Test, TestingModule } from '@nestjs/testing';
import { InsectController } from './insect.controller';
import { InsectService } from './insect.service';

describe('InsectController', () => {
  let controller: InsectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InsectController],
      providers: [InsectService],
    }).compile();

    controller = module.get<InsectController>(InsectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
