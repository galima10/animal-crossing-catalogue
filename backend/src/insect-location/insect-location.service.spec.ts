import { Test, TestingModule } from '@nestjs/testing';
import { InsectLocationService } from './insect-location.service';

describe('InsectLocationService', () => {
  let service: InsectLocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InsectLocationService],
    }).compile();

    service = module.get<InsectLocationService>(InsectLocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
