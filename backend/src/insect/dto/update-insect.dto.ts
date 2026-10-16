import { PartialType } from '@nestjs/mapped-types';
import { CreateInsectDto } from './create-insect.dto';

export class UpdateInsectDto extends PartialType(CreateInsectDto) {}
