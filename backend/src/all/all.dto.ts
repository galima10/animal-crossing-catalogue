import { Gender, Category, Weather } from '@prisma/client';

export class AllResponseDto {
  table!: 'villagers' | 'furnitures' | 'insects' | 'fishs' | 'sea-creatures';
  id!: string;
  name!: string;
  imageUrl!: string;
  buyingPrice!: number | null;
  sellingPrice!: number | null;
  birthday!: string | null;
  gender!: Gender | null;
  speciesName!: string | null;
  personalityName!: string | null;
  category!: Category | null;
  variationNames!: string | null;
  insectLocationName!: string | null;
  weather!: Weather | null;
  seaPlaceName!: string | null;
}
