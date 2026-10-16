import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeaPlaceService } from './sea-place.service';
import { CreateSeaPlaceDto } from './dto/create-sea-place.dto';
import { UpdateSeaPlaceDto } from './dto/update-sea-place.dto';

@Controller('sea-place')
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
    return this.seaPlaceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeaPlaceDto: UpdateSeaPlaceDto) {
    return this.seaPlaceService.update(+id, updateSeaPlaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seaPlaceService.remove(+id);
  }
}
