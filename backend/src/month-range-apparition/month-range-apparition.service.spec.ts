import { Test, TestingModule } from '@nestjs/testing';
import { MonthRangeApparitionService } from './month-range-apparition.service';

describe('MonthRangeApparitionService', () => {
  let service: MonthRangeApparitionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonthRangeApparitionService],
    }).compile();

    service = module.get<MonthRangeApparitionService>(MonthRangeApparitionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
