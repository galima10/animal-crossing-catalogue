import { Injectable } from '@nestjs/common';
import { CreateFishDto } from './create-fish.dto';

@Injectable()
export class FishService {
  create(createFishDto: CreateFishDto) {
    return 'This action adds a new fish';
  }

  findAll() {
    return `This action returns all fish`;
  }

  findOne(id: string) {
    return `This action returns a #${id} fish`;
  }

  remove(id: string) {
    return `This action removes a #${id} fish`;
  }
}
