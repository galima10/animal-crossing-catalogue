import { Test, TestingModule } from '@nestjs/testing';
import { InsectService } from './insect.service';

describe('InsectService', () => {
  let service: InsectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InsectService],
    }).compile();

    service = module.get<InsectService>(InsectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
