import { Module } from '@nestjs/common';
import { InsectService } from './insect.service';
import { InsectController } from './insect.controller';

@Module({
  controllers: [InsectController],
  providers: [InsectService],
})
export class InsectModule {}
