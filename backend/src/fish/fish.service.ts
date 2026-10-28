import { Injectable } from '@nestjs/common';
import { FishResponseDto } from './fish.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  parsePaging,
  returnPagingMetaData,
  type PaginationMetaData,
} from 'src/common/utils/pagination.utils';
import { parseSorter } from 'src/common/utils/sorter.utils';
import { fishAllowedSorts } from 'src/common/constants/allowed-sorts.constants';
import { fishSearchableColumns } from 'src/common/constants/allowed-search.constants';
import { parseSearcher } from 'src/common/utils/searcher.utils';
import { fishSelect, fishDetails, countQuery } from './fish-query.sql';
import { Prisma } from '@prisma/client';

@Injectable()
export class FishService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(
    page?: string,
    size?: string,
    sort?: string | string[],
    q?: string,
    seaPlaceId?: string,
  ): Promise<{
    data: FishResponseDto[];
    pagination: PaginationMetaData;
  }> {
    const { currentPage, pageSize, offset } = parsePaging(page, size);
    const orderBy = parseSorter(fishAllowedSorts, sort);
    const searchConditions = parseSearcher(fishSearchableColumns, q);
    const conditions = [...searchConditions];
    if (seaPlaceId) {
      conditions.push(
        Prisma.sql`fi.sea_place_id = ${seaPlaceId}`,
      );
    }
    const where = conditions.length
      ? Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}`
      : Prisma.empty;

    const [{ total }] = await this.prisma.$queryRaw<{ total: number }[]>(
      countQuery(where),
    );
    const data = await this.prisma.$queryRaw<FishResponseDto[]>(Prisma.sql`
      ${fishSelect}
      ${where}
      ORDER BY ${orderBy}
      LIMIT ${pageSize}
      OFFSET ${offset}
    `);
    return {
      data,
      pagination: returnPagingMetaData(currentPage, pageSize, total),
    };
  }

  async findOne(id: string) {
    return await this.prisma.$queryRaw`
      ${fishDetails}
      WHERE fi.id = ${id}
    `;
  }
}
