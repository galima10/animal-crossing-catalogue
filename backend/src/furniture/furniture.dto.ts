export class FurnitureResponseDto {
  name!: string;
  category!: 'houseware' | 'miscellaneous' | 'ceilingDecor' | 'wallMounted';
  imageUrl!: string;
  buyingPrice!: number;
  sellingPrice!: number;
  variations!: {
    variationName: string;
    variationImageUrl: string;
  }[];
}
