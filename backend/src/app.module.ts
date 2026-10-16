import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { VillagerModule } from './villager/villager.module';
import { SpeciesModule } from './species/species.module';
import { PersonalityModule } from './personality/personality.module';
import { InsectLocationModule } from './insect-location/insect-location.module';
import { InsectModule } from './insect/insect.module';
import { SeaPlaceModule } from './sea-place/sea-place.module';
import { FishModule } from './fish/fish.module';
import { SeaCreatureModule } from './sea-creature/sea-creature.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    VillagerModule,
    SpeciesModule,
    PersonalityModule,
    InsectLocationModule,
    InsectModule,
    SeaPlaceModule,
    FishModule,
    SeaCreatureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
