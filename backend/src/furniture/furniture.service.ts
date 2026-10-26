import { Injectable } from '@nestjs/common';
import { FurnitureResponseDto } from './furniture.dto';

@Injectable()
export class FurnitureService {

  findAll() {
    return `This action returns all furniture`;
  }

  findOne(id: string) {
    return `This action returns a #${id} furniture`;
  }
}
