import { Injectable } from '@nestjs/common';
import { CreatePersonalityDto } from './dto/create-personality.dto';
import { UpdatePersonalityDto } from './dto/update-personality.dto';

@Injectable()
export class PersonalityService {
  create(createPersonalityDto: CreatePersonalityDto) {
    return 'This action adds a new personality';
  }

  findAll() {
    return `This action returns all personality`;
  }

  findOne(id: string) {
    return `This action returns a #${id} personality`;
  }

  update(id: string, updatePersonalityDto: UpdatePersonalityDto) {
    return `This action updates a #${id} personality`;
  }

  remove(id: string) {
    return `This action removes a #${id} personality`;
  }
}
