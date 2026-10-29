import { Category } from '@prisma/client';

export class FurnitureResponseDto {
  id!: string;
  name!: string;
  category!: Category;
  imageUrl!: string;
  buyingPrice!: number;
  sellingPrice!: number;
  variationNames!: string;
  variations?: {
    variationName: string;
    variationImageUrl: string;
  }[];
}
