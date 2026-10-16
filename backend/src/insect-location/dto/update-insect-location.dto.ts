import { PartialType } from '@nestjs/mapped-types';
import { CreateInsectLocationDto } from './create-insect-location.dto';

export class UpdateInsectLocationDto extends PartialType(CreateInsectLocationDto) {}
