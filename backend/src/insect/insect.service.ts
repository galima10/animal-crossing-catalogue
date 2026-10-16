import { Injectable } from '@nestjs/common';
import { CreateInsectDto } from './create-insect.dto';

@Injectable()
export class InsectService {
  create(createInsectDto: CreateInsectDto) {
    return 'This action adds a new insect';
  }

  findAll() {
    return `This action returns all insect`;
  }

  findOne(id: string) {
    return `This action returns a #${id} insect`;
  }

  remove(id: string) {
    return `This action removes a #${id} insect`;
  }
}
