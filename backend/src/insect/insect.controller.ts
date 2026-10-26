import { Controller, Get, Param } from '@nestjs/common';
import { InsectService } from './insect.service';

@Controller('insects')
export class InsectController {
  constructor(private readonly insectService: InsectService) {}

  @Get()
  findAll() {
    return this.insectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.insectService.findOne(id);
  }
}
