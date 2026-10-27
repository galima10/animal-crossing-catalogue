import { Prisma } from '@prisma/client';
import type { SearchableColumn } from '../constants/allowed-search.constants';

export function parseSearcher(
  searchableColumns: SearchableColumn[],
  q?: string,
) {
  console.log('q reçu :', JSON.stringify(q));
  console.log('q nettoyé :', JSON.stringify(q?.trim()));
  const searchTerm = q?.trim();

  if (!searchTerm) {
    return Prisma.empty;
  }

  return Prisma.sql`WHERE ${Prisma.join(
    searchableColumns.map(({ column, type }) => {
      const sqlColumn = Prisma.raw(column);
      const pattern = `%${searchTerm}%`;

      if (type === 'enum') {
        return Prisma.sql`${sqlColumn}::text ILIKE ${pattern}`;
      }

      return Prisma.sql`${sqlColumn} ILIKE ${pattern}`;
    }),
    ' OR ',
  )}`;
}
