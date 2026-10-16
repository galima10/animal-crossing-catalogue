import { Injectable } from '@nestjs/common';
import { CreateFishDto } from './dto/create-fish.dto';
import { UpdateFishDto } from './dto/update-fish.dto';

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

  update(id: string, updateFishDto: UpdateFishDto) {
    return `This action updates a #${id} fish`;
  }

  remove(id: string) {
    return `This action removes a #${id} fish`;
  }
}
