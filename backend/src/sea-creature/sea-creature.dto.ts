export class SeaCreatureResponseDto {
  name!: string;
  imageUrl!: string;
  sellingPrice!: number;
  monthlyAvalaibility!: number;
  monthRangesApparition!: {
    north: {
      month: string;
      ranges: { startHour: string; endHour: string }[];
      isAllDay: boolean;
    }[];
    south: {
      month: string;
      ranges: { startHour: string; endHour: string }[];
      isAllDay: boolean;
    }[];
  };
}
