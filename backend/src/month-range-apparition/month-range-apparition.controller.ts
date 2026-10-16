import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MonthRangeApparitionService } from './month-range-apparition.service';
import { CreateMonthRangeApparitionDto } from './create-month-range-apparition.dto';

@Controller('month-range-apparitions')
export class MonthRangeApparitionController {
  constructor(private readonly monthRangeApparitionService: MonthRangeApparitionService) {}

  @Post()
  create(@Body() createMonthRangeApparitionDto: CreateMonthRangeApparitionDto) {
    return this.monthRangeApparitionService.create(createMonthRangeApparitionDto);
  }

  @Get()
  findAll() {
    return this.monthRangeApparitionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monthRangeApparitionService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.monthRangeApparitionService.remove(id);
  }
}
