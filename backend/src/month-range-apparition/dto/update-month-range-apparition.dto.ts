import { PartialType } from '@nestjs/mapped-types';
import { CreateMonthRangeApparitionDto } from './create-month-range-apparition.dto';

export class UpdateMonthRangeApparitionDto extends PartialType(CreateMonthRangeApparitionDto) {}
