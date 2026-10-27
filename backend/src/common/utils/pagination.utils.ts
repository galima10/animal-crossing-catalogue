export interface PaginationMetaData {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export function parsePaging(page?: string, size?: string) {
  const currentPage = Math.max(1, Number(page) || 1);
  const pageSize = Math.min(100, Math.max(1, Number(size) || 10));
  const offset = (currentPage - 1) * pageSize;

  return {
    currentPage,
    pageSize,
    offset,
  };
}

export function returnPagingMetaData(
  currentPage: number,
  pageSize: number,
  total: number,
): PaginationMetaData {
  const totalPages = Math.ceil(total / pageSize);
  return {
    currentPage,
    pageSize,
    totalItems: total,
    totalPages,
    hasPreviousPage: currentPage > 1,
    hasNextPage: currentPage < totalPages,
  };
}
