import { Module } from '@nestjs/common';
import { MonthRangeApparitionService } from './month-range-apparition.service';
import { MonthRangeApparitionController } from './month-range-apparition.controller';

@Module({
  controllers: [MonthRangeApparitionController],
  providers: [MonthRangeApparitionService],
})
export class MonthRangeApparitionModule {}
