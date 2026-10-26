import { Injectable } from '@nestjs/common';
import { SeaCreatureResponseDto } from './sea-creature.dto';

@Injectable()
export class SeaCreatureService {
  findAll() {
    return `This action returns all seaCreature`;
  }

  findOne(id: string) {
    return `This action returns a #${id} seaCreature`;
  }
}
