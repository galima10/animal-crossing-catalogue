import { Month } from "@prisma/client";

export class FishResponseDto {
  name!: string;
  imageUrl!: string;
  sellingPrice!: number;
  seaPlaceName!: string;
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
