import { Injectable } from '@nestjs/common';
import { CreateInsectDto } from './dto/create-insect.dto';
import { UpdateInsectDto } from './dto/update-insect.dto';

@Injectable()
export class InsectService {
  create(createInsectDto: CreateInsectDto) {
    return 'This action adds a new insect';
  }

  findAll() {
    return `This action returns all insect`;
  }

  findOne(id: number) {
    return `This action returns a #${id} insect`;
  }

  update(id: number, updateInsectDto: UpdateInsectDto) {
    return `This action updates a #${id} insect`;
  }

  remove(id: number) {
    return `This action removes a #${id} insect`;
  }
}
