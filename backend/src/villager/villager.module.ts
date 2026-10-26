import { Module } from '@nestjs/common';
import { VillagerService } from './villager.service';
import { VillagerController } from './villager.controller';

@Module({
  controllers: [VillagerController],
  providers: [VillagerService],
})
export class VillagerModule {}
