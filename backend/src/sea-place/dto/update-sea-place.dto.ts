import { PartialType } from '@nestjs/mapped-types';
import { CreateSeaPlaceDto } from './create-sea-place.dto';

export class UpdateSeaPlaceDto extends PartialType(CreateSeaPlaceDto) {}
