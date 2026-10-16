import { PartialType } from '@nestjs/mapped-types';
import { CreateVillagerDto } from './create-villager.dto';

export class UpdateVillagerDto extends PartialType(CreateVillagerDto) {}
