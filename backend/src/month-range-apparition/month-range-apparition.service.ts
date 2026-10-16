import { Injectable } from '@nestjs/common';
import { CreateMonthRangeApparitionDto } from './dto/create-month-range-apparition.dto';
import { UpdateMonthRangeApparitionDto } from './dto/update-month-range-apparition.dto';

@Injectable()
export class MonthRangeApparitionService {
  create(createMonthRangeApparitionDto: CreateMonthRangeApparitionDto) {
    return 'This action adds a new monthRangeApparition';
  }

  findAll() {
    return `This action returns all monthRangeApparition`;
  }

  findOne(id: number) {
    return `This action returns a #${id} monthRangeApparition`;
  }

  update(id: number, updateMonthRangeApparitionDto: UpdateMonthRangeApparitionDto) {
    return `This action updates a #${id} monthRangeApparition`;
  }

  remove(id: number) {
    return `This action removes a #${id} monthRangeApparition`;
  }
}
