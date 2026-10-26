import { Injectable } from '@nestjs/common';
import { InsectResponseDto } from './insect.dto';

@Injectable()
export class InsectService {
  findAll() {
    return `This action returns all insect`;
  }

  findOne(id: string) {
    return `This action returns a #${id} insect`;
  }
}
