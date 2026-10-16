import { Test, TestingModule } from '@nestjs/testing';
import { SeaCreatureService } from './sea-creature.service';

describe('SeaCreatureService', () => {
  let service: SeaCreatureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeaCreatureService],
    }).compile();

    service = module.get<SeaCreatureService>(SeaCreatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
