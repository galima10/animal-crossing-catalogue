export function parsePaging(page?: string, size?: string) {
  const currentPage = Math.max(1, Number(page) || 1);
  const pageSize = Math.min(100, Math.max(1, Number(size) || 10));
  const offset = (currentPage - 1) * pageSize;
  return {
    pageSize,
    offset,
  };
}
