import { Injectable } from '@nestjs/common';
import { CreateVillagerDto } from './create-villager.dto';

@Injectable()
export class VillagerService {
  create(createVillagerDto: CreateVillagerDto) {
    return 'This action adds a new villager';
  }

  findAll() {
    return `This action returns all villager`;
  }

  findOne(id: string) {
    return `This action returns a #${id} villager`;
  }

  remove(id: string) {
    return `This action removes a #${id} villager`;
  }
}
