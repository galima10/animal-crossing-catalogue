import { Controller, Get, Param } from '@nestjs/common';
import { FishService } from './fish.service';

@Controller('fishs')
export class FishController {
  constructor(private readonly fishService: FishService) {}

  @Get()
  findAll() {
    return this.fishService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fishService.findOne(id);
  }
}
