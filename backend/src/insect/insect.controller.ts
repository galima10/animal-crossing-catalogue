import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InsectService } from './insect.service';
import { CreateInsectDto } from './dto/create-insect.dto';
import { UpdateInsectDto } from './dto/update-insect.dto';

@Controller('insects')
export class InsectController {
  constructor(private readonly insectService: InsectService) {}

  @Post()
  create(@Body() createInsectDto: CreateInsectDto) {
    return this.insectService.create(createInsectDto);
  }

  @Get()
  findAll() {
    return this.insectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.insectService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInsectDto: UpdateInsectDto) {
    return this.insectService.update(id, updateInsectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.insectService.remove(id);
  }
}
