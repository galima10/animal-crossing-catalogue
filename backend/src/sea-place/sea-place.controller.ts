import { Controller, Get } from '@nestjs/common';
import { SeaPlaceService } from './sea-place.service';

@Controller('sea-places')
export class SeaPlaceController {
  constructor(private readonly seaPlaceService: SeaPlaceService) {}

  @Get()
  findAll() {
    return this.seaPlaceService.findAll();
  }
}
