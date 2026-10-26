import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { VillagerModule } from './villager/villager.module';
import { InsectModule } from './insect/insect.module';
import { FishModule } from './fish/fish.module';
import { SeaCreatureModule } from './sea-creature/sea-creature.module';
import { FurnitureModule } from './furniture/furniture.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    VillagerModule,
    InsectModule,
    FishModule,
    SeaCreatureModule,
    FurnitureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
