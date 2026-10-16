import { Injectable } from '@nestjs/common';
import { CreateSeaCreatureDto } from './create-sea-creature.dto';

@Injectable()
export class SeaCreatureService {
  create(createSeaCreatureDto: CreateSeaCreatureDto) {
    return 'This action adds a new seaCreature';
  }

  findAll() {
    return `This action returns all seaCreature`;
  }

  findOne(id: string) {
    return `This action returns a #${id} seaCreature`;
  }

  remove(id: string) {
    return `This action removes a #${id} seaCreature`;
  }
}
