import { Test, TestingModule } from '@nestjs/testing';
import { InsectLocationController } from './insect-location.controller';
import { InsectLocationService } from './insect-location.service';

describe('InsectLocationController', () => {
  let controller: InsectLocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InsectLocationController],
      providers: [InsectLocationService],
    }).compile();

    controller = module.get<InsectLocationController>(InsectLocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
