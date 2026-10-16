import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonalityService } from './personality.service';
import { CreatePersonalityDto } from './create-personality.dto';

@Controller('personalities')
export class PersonalityController {
  constructor(private readonly personalityService: PersonalityService) {}

  @Post()
  create(@Body() createPersonalityDto: CreatePersonalityDto) {
    return this.personalityService.create(createPersonalityDto);
  }

  @Get()
  findAll() {
    return this.personalityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personalityService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personalityService.remove(id);
  }
}
