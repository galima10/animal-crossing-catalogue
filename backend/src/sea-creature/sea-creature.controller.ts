import { Controller, Get, Param, Query } from '@nestjs/common';
import { SeaCreatureService } from './sea-creature.service';

@Controller('sea-creatures')
export class SeaCreatureController {
  constructor(private readonly seaCreatureService: SeaCreatureService) {}

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('size') size?: string,
    @Query('sort') sort?: string | string[],
    @Query('q') q?: string,
  ) {
    return this.seaCreatureService.findAll(page, size, sort, q);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seaCreatureService.findOne(id);
  }
}
