import { Injectable } from '@nestjs/common';
import { CreateSeaPlaceDto } from './create-sea-place.dto';

@Injectable()
export class SeaPlaceService {
  create(createSeaPlaceDto: CreateSeaPlaceDto) {
    return 'This action adds a new seaPlace';
  }

  findAll() {
    return `This action returns all seaPlace`;
  }

  findOne(id: string) {
    return `This action returns a #${id} seaPlace`;
  }

  remove(id: string) {
    return `This action removes a #${id} seaPlace`;
  }
}
