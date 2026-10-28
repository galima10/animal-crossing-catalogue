import { Module } from '@nestjs/common';
import { InsectLocationService } from './insect-location.service';
import { InsectLocationController } from './insect-location.controller';

@Module({
  controllers: [InsectLocationController],
  providers: [InsectLocationService],
})
export class InsectLocationModule {}
