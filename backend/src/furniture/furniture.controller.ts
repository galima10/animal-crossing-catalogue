import { Controller, Get, Param } from '@nestjs/common';
import { FurnitureService } from './furniture.service';

@Controller('furnitures')
export class FurnitureController {
  constructor(private readonly furnitureService: FurnitureService) {}

  @Get()
  findAll() {
    return this.furnitureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.furnitureService.findOne(id);
  }
}
