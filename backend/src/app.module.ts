import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { VillagerModule } from './villager/villager.module';
import { SpeciesModule } from './species/species.module';
import { PersonalityModule } from './personality/personality.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    VillagerModule,
    SpeciesModule,
    PersonalityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
