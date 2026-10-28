import { Weather, Month } from "@prisma/client";

export class InsectResponseDto {
  name!: string;
  imageUrl!: string;
  sellingPrice!: number;
  insectLocationName!: string;
  weather!: Weather;
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