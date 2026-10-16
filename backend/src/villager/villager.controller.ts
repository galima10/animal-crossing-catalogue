import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VillagerService } from './villager.service';
import { CreateVillagerDto } from './dto/create-villager.dto';
import { UpdateVillagerDto } from './dto/update-villager.dto';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVillagerDto: UpdateVillagerDto) {
    return this.villagerService.update(id, updateVillagerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.villagerService.remove(id);
  }
}
