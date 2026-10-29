import { Controller, Get, Query } from '@nestjs/common';
import { AllService } from './all.service';

@Controller('all')
export class AllController {
  constructor(private readonly allService: AllService) {}

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('size') size?: string,
    @Query('q') q?: string,
  ) {
    return this.allService.findAll(page, size, q);
  }
}
