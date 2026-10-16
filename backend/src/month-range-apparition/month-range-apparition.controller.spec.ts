import { Test, TestingModule } from '@nestjs/testing';
import { MonthRangeApparitionController } from './month-range-apparition.controller';
import { MonthRangeApparitionService } from './month-range-apparition.service';

describe('MonthRangeApparitionController', () => {
  let controller: MonthRangeApparitionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonthRangeApparitionController],
      providers: [MonthRangeApparitionService],
    }).compile();

    controller = module.get<MonthRangeApparitionController>(MonthRangeApparitionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
