import { Injectable } from '@nestjs/common';
import { CreateSeaCreatureDto } from './dto/create-sea-creature.dto';
import { UpdateSeaCreatureDto } from './dto/update-sea-creature.dto';

@Injectable()
export class SeaCreatureService {
  create(createSeaCreatureDto: CreateSeaCreatureDto) {
    return 'This action adds a new seaCreature';
  }

  findAll() {
    return `This action returns all seaCreature`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seaCreature`;
  }

  update(id: number, updateSeaCreatureDto: UpdateSeaCreatureDto) {
    return `This action updates a #${id} seaCreature`;
  }

  remove(id: number) {
    return `This action removes a #${id} seaCreature`;
  }
}
