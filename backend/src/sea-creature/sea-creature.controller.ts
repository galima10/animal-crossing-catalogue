import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeaCreatureService } from './sea-creature.service';
import { CreateSeaCreatureDto } from './dto/create-sea-creature.dto';
import { UpdateSeaCreatureDto } from './dto/update-sea-creature.dto';

@Controller('sea-creatures')
export class SeaCreatureController {
  constructor(private readonly seaCreatureService: SeaCreatureService) {}

  @Post()
  create(@Body() createSeaCreatureDto: CreateSeaCreatureDto) {
    return this.seaCreatureService.create(createSeaCreatureDto);
  }

  @Get()
  findAll() {
    return this.seaCreatureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seaCreatureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeaCreatureDto: UpdateSeaCreatureDto) {
    return this.seaCreatureService.update(+id, updateSeaCreatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seaCreatureService.remove(+id);
  }
}
