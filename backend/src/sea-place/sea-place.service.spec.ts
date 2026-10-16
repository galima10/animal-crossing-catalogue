import { Test, TestingModule } from '@nestjs/testing';
import { SeaPlaceService } from './sea-place.service';

describe('SeaPlaceService', () => {
  let service: SeaPlaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeaPlaceService],
    }).compile();

    service = module.get<SeaPlaceService>(SeaPlaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
