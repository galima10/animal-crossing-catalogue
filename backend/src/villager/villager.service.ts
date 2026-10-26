import { Injectable } from '@nestjs/common';
import { VillagerResponseDto } from './villager.dto';

@Injectable()
export class VillagerService {
  findAll() {
    return `This action returns all villager`;
  }

  findOne(id: string) {
    return `This action returns a #${id} villager`;
  }
}
