import { BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export function parseSorter(
  allowedSorts: Record<string, string>,
  sort?: string | string[],
) {
  const sortFields = sort ? (Array.isArray(sort) ? sort : [sort]) : ['id:asc'];

  const orderBy = sortFields.map((item) => {
    const [field, rawDirection, ...extra] = item.split(':');

    const column = allowedSorts[field];
    const direction = (rawDirection ?? 'asc').toLowerCase();

    if (!column || extra.length > 0 || !['asc', 'desc'].includes(direction)) {
      throw new BadRequestException(`Paramètre de tri invalide : ${item}`);
    }

    return Prisma.raw(`${column} ${direction.toUpperCase()}`);
  });

  return Prisma.join(orderBy);
}
