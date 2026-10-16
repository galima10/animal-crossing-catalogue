import { PartialType } from '@nestjs/mapped-types';
import { CreateSeaCreatureDto } from './create-sea-creature.dto';

export class UpdateSeaCreatureDto extends PartialType(CreateSeaCreatureDto) {}
