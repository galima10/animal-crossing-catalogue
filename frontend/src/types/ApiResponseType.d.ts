export interface ApiResponseType {
  data: ItemResponse[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export interface ItemResponse {
  table: "villagers" | "furnitures" | "insects" | "fishs" | "sea-creatures";
  id: string;
  name: string;
  imageUrl: string;
  buyingPrice?: number | null;
  sellingPrice?: number | null;
  birthday?: string | null;
  gender?: string | null;
  speciesName?: string | null;
  personalityName?: string | null;
  category?: string | null;
  variationNames?: string | null;
  insectLocationName?: string | null;
  weather?: string | null;
  seaPlaceName?: string | null;
}

export interface OneItemResponse {
  id: string;
  name: string;
  imageUrl: string;
  buyingPrice?: number | null;
  sellingPrice?: number | null;
  birthday?: string | null;
  gender?: string | null;
  speciesName?: string | null;
  personalityName?: string | null;
  category?: string | null;
  variationNames?: string | null;
  insectLocationName?: string | null;
  weather?: string | null;
  seaPlaceName?: string | null;
  variations?:
    | {
        variationName: string;
        variationImageUrl: string;
      }[]
    | null;
  monthRangesApparition?: {
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
  } | null;
}

export interface QueryParamsType {
  page?: number;
  size?: number;
  sort?: string[] | string;
  q?: string;
  filter?: {
    column: string;
    value: string;
  };
}
