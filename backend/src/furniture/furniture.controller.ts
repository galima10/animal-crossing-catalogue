import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FurnitureService } from './furniture.service';
import { CreateFurnitureDto } from './create-furniture.dto';

@Controller('furnitures')
export class FurnitureController {
  constructor(private readonly furnitureService: FurnitureService) {}

  @Post()
  create(@Body() createFurnitureDto: CreateFurnitureDto) {
    return this.furnitureService.create(createFurnitureDto);
  }

  @Get()
  findAll() {
    return this.furnitureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.furnitureService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.furnitureService.remove(id);
  }
}
