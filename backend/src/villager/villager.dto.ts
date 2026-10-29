import { Gender } from '@prisma/client';

export class VillagerResponseDto {
  id!: string;
  name!: string;
  imageUrl!: string;
  birthday!: string;
  gender!: Gender;
  speciesName!: string;
  personalityName!: string;
}
