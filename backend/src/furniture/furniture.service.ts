import { Injectable } from '@nestjs/common';
import { CreateFurnitureDto } from './create-furniture.dto';

@Injectable()
export class FurnitureService {
  create(createFurnitureDto: CreateFurnitureDto) {
    return 'This action adds a new furniture';
  }

  findAll() {
    return `This action returns all furniture`;
  }

  findOne(id: string) {
    return `This action returns a #${id} furniture`;
  }

  remove(id: string) {
    return `This action removes a #${id} furniture`;
  }
}
