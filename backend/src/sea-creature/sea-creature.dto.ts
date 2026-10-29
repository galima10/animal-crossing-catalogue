import { Month } from "@prisma/client";

export class SeaCreatureResponseDto {
  id!: string;
  name!: string;
  imageUrl!: string;
  sellingPrice!: number;
  monthRangesApparition?: {
    north: {
      month: Month;
      ranges: { startHour: string; endHour: string }[];
      isAllDay: boolean;
    }[];
    south: {
      month: Month;
      ranges: { startHour: string; endHour: string }[];
      isAllDay: boolean;
    }[];
  };
}
