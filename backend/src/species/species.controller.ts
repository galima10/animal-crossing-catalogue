import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './create-species.dto';

@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Post()
  create(@Body() createSpeciesDto: CreateSpeciesDto) {
    return this.speciesService.create(createSpeciesDto);
  }

  @Get()
  findAll() {
    return this.speciesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.speciesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.speciesService.remove(id);
  }
}
