import { Controller, Get, Param, Query } from '@nestjs/common';
import { InsectService } from './insect.service';

@Controller('insects')
export class InsectController {
  constructor(private readonly insectService: InsectService) {}

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('size') size?: string,
    @Query('sort') sort?: string | string[],
    @Query('q') q?: string,
    @Query('weather') weather?: string,
    @Query('insect_location_id') insectLocationId?: string,
  ) {
    return this.insectService.findAll(page, size, sort, q, weather, insectLocationId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.insectService.findOne(id);
  }
}
