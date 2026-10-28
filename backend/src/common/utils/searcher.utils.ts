import { Prisma } from '@prisma/client';
import type { SearchableColumn } from '../constants/allowed-search.constants';

// export function parseSearcher(
//   searchableColumns: SearchableColumn[],
//   q?: string,
//   extraConditions: Prisma.Sql[] = [],
// ): Prisma.Sql {
//   const searchTerm = q?.trim();

//   if (!searchTerm) {
//     return Prisma.empty;
//   }

//   const pattern = `%${searchTerm}%`;

//   const conditions = searchableColumns.map(({ column, type }) => {
//     const sqlColumn = Prisma.raw(column);

//     if (type === 'enum') {
//       return Prisma.sql`${sqlColumn}::text ILIKE ${pattern}`;
//     }

//     return Prisma.sql`${sqlColumn} ILIKE ${pattern}`;
//   });

//   conditions.push(...extraConditions);

//   return Prisma.sql`
//     WHERE (${Prisma.join(conditions, ' OR ')})
//   `;
// }

export function parseSearcher(
  searchableColumns: SearchableColumn[],
  q?: string,
  extraConditions: Prisma.Sql[] = [],
): Prisma.Sql[] {
  const searchTerm = q?.trim();

  if (!searchTerm) {
    return [...extraConditions];
  }

  const pattern = `%${searchTerm}%`;

  const conditions = searchableColumns.map(({ column, type }) => {
    const sqlColumn = Prisma.raw(column);

    if (type === 'enum') {
      return Prisma.sql`${sqlColumn}::text ILIKE ${pattern}`;
    }

    return Prisma.sql`${sqlColumn} ILIKE ${pattern}`;
  });

  const searchCondition = Prisma.sql`(${Prisma.join(conditions, ' OR ')})`;

  return [...extraConditions, searchCondition];
}