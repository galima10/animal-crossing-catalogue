import { Controller, Get } from '@nestjs/common';
import { PersonalityService } from './personality.service';

@Controller('personalities')
export class PersonalityController {
  constructor(private readonly personalityService: PersonalityService) {}

  @Get()
  findAll() {
    return this.personalityService.findAll();
  }
}
