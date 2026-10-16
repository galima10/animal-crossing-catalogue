import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InsectLocationService } from './insect-location.service';
import { CreateInsectLocationDto } from './dto/create-insect-location.dto';
import { UpdateInsectLocationDto } from './dto/update-insect-location.dto';

@Controller('insect-locations')
export class InsectLocationController {
  constructor(private readonly insectLocationService: InsectLocationService) {}

  @Post()
  create(@Body() createInsectLocationDto: CreateInsectLocationDto) {
    return this.insectLocationService.create(createInsectLocationDto);
  }

  @Get()
  findAll() {
    return this.insectLocationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.insectLocationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInsectLocationDto: UpdateInsectLocationDto) {
    return this.insectLocationService.update(+id, updateInsectLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.insectLocationService.remove(+id);
  }
}
