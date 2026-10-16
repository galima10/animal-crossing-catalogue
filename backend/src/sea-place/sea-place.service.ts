import { Injectable } from '@nestjs/common';
import { CreateSeaPlaceDto } from './dto/create-sea-place.dto';
import { UpdateSeaPlaceDto } from './dto/update-sea-place.dto';

@Injectable()
export class SeaPlaceService {
  create(createSeaPlaceDto: CreateSeaPlaceDto) {
    return 'This action adds a new seaPlace';
  }

  findAll() {
    return `This action returns all seaPlace`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seaPlace`;
  }

  update(id: number, updateSeaPlaceDto: UpdateSeaPlaceDto) {
    return `This action updates a #${id} seaPlace`;
  }

  remove(id: number) {
    return `This action removes a #${id} seaPlace`;
  }
}
