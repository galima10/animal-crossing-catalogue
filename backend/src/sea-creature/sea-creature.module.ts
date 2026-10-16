import { Module } from '@nestjs/common';
import { SeaCreatureService } from './sea-creature.service';
import { SeaCreatureController } from './sea-creature.controller';

@Module({
  controllers: [SeaCreatureController],
  providers: [SeaCreatureService],
})
export class SeaCreatureModule {}
