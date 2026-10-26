import { Controller, Get, Param } from '@nestjs/common';
import { VillagerService } from './villager.service';

@Controller('villagers')
export class VillagerController {
  constructor(private readonly villagerService: VillagerService) {}

  @Get()
  findAll() {
    return this.villagerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.villagerService.findOne(id);
  }
}
