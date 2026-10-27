export class InsectResponseDto {
  name!: string;
  imageUrl!: string;
  sellingPrice!: number;
  monthlyAvalaibility!: number;
  insectLocationName!: string;
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
