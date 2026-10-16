import { Test, TestingModule } from '@nestjs/testing';
import { SeaPlaceController } from './sea-place.controller';
import { SeaPlaceService } from './sea-place.service';

describe('SeaPlaceController', () => {
  let controller: SeaPlaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeaPlaceController],
      providers: [SeaPlaceService],
    }).compile();

    controller = module.get<SeaPlaceController>(SeaPlaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
