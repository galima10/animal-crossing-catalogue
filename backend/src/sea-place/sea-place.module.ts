import { Module } from '@nestjs/common';
import { SeaPlaceService } from './sea-place.service';
import { SeaPlaceController } from './sea-place.controller';

@Module({
  controllers: [SeaPlaceController],
  providers: [SeaPlaceService],
})
export class SeaPlaceModule {}
