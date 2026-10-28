import { Controller, Get, Param, Query } from '@nestjs/common';
import { FurnitureService } from './furniture.service';

@Controller('furnitures')
export class FurnitureController {
  constructor(private readonly furnitureService: FurnitureService) {}

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('size') size?: string,
    @Query('sort') sort?: string | string[],
    @Query('q') q?: string,
    @Query('category') category?: string,
  ) {
    return this.furnitureService.findAll(page, size, sort, q, category);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.furnitureService.findOne(id);
  }
}
