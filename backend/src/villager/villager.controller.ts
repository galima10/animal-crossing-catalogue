import { Controller, Get, Param, Query } from '@nestjs/common';
import { VillagerService } from './villager.service';

@Controller('villagers')
export class VillagerController {
  constructor(private readonly villagerService: VillagerService) {}

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('size') size?: string,
    @Query('sort') sort?: string | string[],
    @Query('q') q?: string,
    @Query('personality_id') personalityId?: string,
    @Query('species_id') speciesId?: string,
  ) {
    return this.villagerService.findAll(
      page,
      size,
      sort,
      q,
      personalityId,
      speciesId,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.villagerService.findOne(id);
  }
}
