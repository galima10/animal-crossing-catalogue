import { Controller, Get, Param, Query } from '@nestjs/common';
import { FishService } from './fish.service';

@Controller('fishs')
export class FishController {
  constructor(private readonly fishService: FishService) {}

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('size') size?: string,
    @Query('sort') sort?: string | string[],
    @Query('q') q?: string,
  ) {
    return this.fishService.findAll(page, size, sort, q);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fishService.findOne(id);
  }
}
