import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VillagerService } from './villager.service';
import { CreateVillagerDto } from './create-villager.dto';

@Controller('villagers')
export class VillagerController {
  constructor(private readonly villagerService: VillagerService) {}

  @Post()
  create(@Body() createVillagerDto: CreateVillagerDto) {
    return this.villagerService.create(createVillagerDto);
  }

  @Get()
  findAll() {
    return this.villagerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.villagerService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.villagerService.remove(id);
  }
}
