import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VariationService } from './variation.service';
import { CreateVariationDto } from './create-variation.dto';

@Controller('variations')
export class VariationController {
  constructor(private readonly variationService: VariationService) {}

  @Post()
  create(@Body() createVariationDto: CreateVariationDto) {
    return this.variationService.create(createVariationDto);
  }

  @Get()
  findAll() {
    return this.variationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variationService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.variationService.remove(id);
  }
}
