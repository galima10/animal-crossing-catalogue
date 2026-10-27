import { Injectable } from '@nestjs/common';
import { InsectResponseDto } from './insect.dto';

@Injectable()
export class InsectService {
  findAll(page?: string, size?: string, sort?: string | string[], q?: string) {
    return `This action returns all insect`;
  }

  findOne(id: string) {
    return `This action returns a #${id} insect`;
  }
}
