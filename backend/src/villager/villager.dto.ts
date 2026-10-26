import { Gender } from '@prisma/client';

export class VillagerResponseDto {
  name!: string;
  imageUrl!: string;
  birthday!: string;
  gender!: Gender;
  speciesName!: string;
  personalityName!: string;
}
