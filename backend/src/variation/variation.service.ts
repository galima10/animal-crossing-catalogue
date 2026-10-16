import { Injectable } from '@nestjs/common';
import { CreateVariationDto } from './dto/create-variation.dto';
import { UpdateVariationDto } from './dto/update-variation.dto';

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

  update(id: string, updateVariationDto: UpdateVariationDto) {
    return `This action updates a #${id} variation`;
  }

  remove(id: string) {
    return `This action removes a #${id} variation`;
  }
}
