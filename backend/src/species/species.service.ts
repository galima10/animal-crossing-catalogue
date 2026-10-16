import { Injectable } from '@nestjs/common';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';

@Injectable()
export class SpeciesService {
  create(createSpeciesDto: CreateSpeciesDto) {
    return 'This action adds a new species';
  }

  findAll() {
    return `This action returns all species`;
  }

  findOne(id: string) {
    return `This action returns a #${id} species`;
  }

  update(id: string, updateSpeciesDto: UpdateSpeciesDto) {
    return `This action updates a #${id} species`;
  }

  remove(id: string) {
    return `This action removes a #${id} species`;
  }
}
