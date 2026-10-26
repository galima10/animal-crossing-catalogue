import { Controller, Get, Param } from '@nestjs/common';
import { SeaCreatureService } from './sea-creature.service';

@Controller('sea-creatures')
export class SeaCreatureController {
  constructor(private readonly seaCreatureService: SeaCreatureService) {}

  @Get()
  findAll() {
    return this.seaCreatureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seaCreatureService.findOne(id);
  }
}
