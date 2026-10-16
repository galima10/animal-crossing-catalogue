import { Injectable } from '@nestjs/common';
import { CreateVariationDto } from './create-variation.dto';

@Injectable()
export class VariationService {
  create(createVariationDto: CreateVariationDto) {
    return 'This action adds a new variation';
  }

  findAll() {
    return `This action returns all variation`;
  }

  findOne(id: string) {
    return `This action returns a #${id} variation`;
  }

  remove(id: string) {
    return `This action removes a #${id} variation`;
  }
}
