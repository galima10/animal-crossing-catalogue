export class FurnitureResponseDto {
  name!: string;
  category!: 'houseware' | 'miscellaneous' | 'ceilingDecor' | 'wallMounted';
  imageUrl!: string;
  buyingPrice!: number;
  sellingPrice!: number;
  variationNames!: string;
  variations!: {
    variationName: string;
    variationImageUrl: string;
  }[];
}
