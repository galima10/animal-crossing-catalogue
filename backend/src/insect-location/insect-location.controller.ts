import { Controller, Get } from '@nestjs/common';
import { InsectLocationService } from './insect-location.service';

@Controller('insect-locations')
export class InsectLocationController {
  constructor(private readonly insectLocationService: InsectLocationService) {}

  @Get()
  findAll() {
    return this.insectLocationService.findAll();
  }
}
