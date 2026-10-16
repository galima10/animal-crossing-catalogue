import { Injectable } from '@nestjs/common';
import { CreatePersonalityDto } from './create-personality.dto';

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

  remove(id: string) {
    return `This action removes a #${id} personality`;
  }
}
