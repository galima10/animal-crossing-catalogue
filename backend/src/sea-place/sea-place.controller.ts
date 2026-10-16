import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeaPlaceService } from './sea-place.service';
import { CreateSeaPlaceDto } from './create-sea-place.dto';

@Controller('sea-places')
export class SeaPlaceController {
  constructor(private readonly seaPlaceService: SeaPlaceService) {}

  @Post()
  create(@Body() createSeaPlaceDto: CreateSeaPlaceDto) {
    return this.seaPlaceService.create(createSeaPlaceDto);
  }

  @Get()
  findAll() {
    return this.seaPlaceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seaPlaceService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seaPlaceService.remove(id);
  }
}
