export interface ApiResponseType {
  data: {
    table: "villagers" | "furnitures" | "insects" | "fishs" | "sea-creatures";
    id: string;
    name: string;
    imageUrl: string;
    buyingPrice?: number | null;
    sellingPrice?: number | null;
    birthday?: string | null;
    gender?: Gender | null;
    speciesName?: string | null;
    personalityName?: string | null;
    category?: Category | null;
    variationNames?: string | null;
    insectLocationName?: string | null;
    weather?: Weather | null;
    seaPlaceName?: string | null;
  }[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export interface QueryParamsType {
  page?: number;
  size?: number;
  sort?: string[] | string;
  q?: string;
}
