import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FishService } from './fish.service';
import { CreateFishDto } from './create-fish.dto';

@Controller('fishs')
export class FishController {
  constructor(private readonly fishService: FishService) {}

  @Post()
  create(@Body() createFishDto: CreateFishDto) {
    return this.fishService.create(createFishDto);
  }

  @Get()
  findAll() {
    return this.fishService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fishService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fishService.remove(id);
  }
}
