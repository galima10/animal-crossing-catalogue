import { Injectable } from '@nestjs/common';
import { FishResponseDto } from './fish.dto';

@Injectable()
export class FishService {
  findAll() {
    return `This action returns all fish`;
  }

  findOne(id: string) {
    return `This action returns a #${id} fish`;
  }
}
