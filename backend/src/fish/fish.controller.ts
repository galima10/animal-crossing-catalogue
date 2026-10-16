import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FishService } from './fish.service';
import { CreateFishDto } from './dto/create-fish.dto';
import { UpdateFishDto } from './dto/update-fish.dto';

@Controller('fish')
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
    return this.fishService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFishDto: UpdateFishDto) {
    return this.fishService.update(+id, updateFishDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fishService.remove(+id);
  }
}
