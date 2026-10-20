import { IsString, IsNumber } from 'class-validator';

export class CreateFishDto {
  @IsString()
  name!: string;

  @IsString()
  imageUrl!: string;

  @IsNumber()
  sellingPrice!: number;

  @IsNumber()
  monthlyAvalaibility!: number;

  @IsString()
  seaPlaceName!: string;
}

export class FishResponseDto {
  name!: string;
  imageUrl!: string;
  sellingPrice!: number;
  monthlyAvalaibility!: number;
  seaPlaceName!: string;
}