export class FishResponseDto {
  name!: string;
  imageUrl!: string;
  sellingPrice!: number;
  seaPlaceName!: string;
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
