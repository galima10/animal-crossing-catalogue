import { Injectable } from '@nestjs/common';
import { CreateInsectLocationDto } from './dto/create-insect-location.dto';
import { UpdateInsectLocationDto } from './dto/update-insect-location.dto';

@Injectable()
export class InsectLocationService {
  create(createInsectLocationDto: CreateInsectLocationDto) {
    return 'This action adds a new insectLocation';
  }

  findAll() {
    return `This action returns all insectLocation`;
  }

  findOne(id: string) {
    return `This action returns a #${id} insectLocation`;
  }

  update(id: string, updateInsectLocationDto: UpdateInsectLocationDto) {
    return `This action updates a #${id} insectLocation`;
  }

  remove(id: string) {
    return `This action removes a #${id} insectLocation`;
  }
}
