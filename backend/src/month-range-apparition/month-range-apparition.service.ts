import { Injectable } from '@nestjs/common';
import { CreateMonthRangeApparitionDto } from './create-month-range-apparition.dto';

@Injectable()
export class MonthRangeApparitionService {
  create(createMonthRangeApparitionDto: CreateMonthRangeApparitionDto) {
    return 'This action adds a new monthRangeApparition';
  }

  findAll() {
    return `This action returns all monthRangeApparition`;
  }

  findOne(id: string) {
    return `This action returns a #${id} monthRangeApparition`;
  }

  remove(id: string) {
    return `This action removes a #${id} monthRangeApparition`;
  }
}
