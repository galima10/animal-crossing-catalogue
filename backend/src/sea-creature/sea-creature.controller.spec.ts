import { Test, TestingModule } from '@nestjs/testing';
import { SeaCreatureController } from './sea-creature.controller';
import { SeaCreatureService } from './sea-creature.service';

describe('SeaCreatureController', () => {
  let controller: SeaCreatureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeaCreatureController],
      providers: [SeaCreatureService],
    }).compile();

    controller = module.get<SeaCreatureController>(SeaCreatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
