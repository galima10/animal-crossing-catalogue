import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  parsePaging,
  returnPagingMetaData,
  type PaginationMetaData,
} from 'src/common/utils/pagination.utils';
import { parseSearcher } from 'src/common/utils/searcher.utils';
import { allSearchableColumns } from 'src/common/constants/allowed-search.constants';
import { Prisma } from '@prisma/client';
import { allSelect, countQuery } from './all-query.sql';
import { AllResponseDto } from './all.dto';

@Injectable()
export class AllService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(
    page?: string,
    size?: string,
    q?: string,
  ): Promise<{
    data: AllResponseDto[];
    pagination: PaginationMetaData;
  }> {
    const { currentPage, pageSize, offset } = parsePaging(page, size);

    const searchConditions = parseSearcher(allSearchableColumns, q);
    const conditions = [...searchConditions];

    const where = conditions.length
      ? Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}`
      : Prisma.empty;
    const [{ total }] = await this.prisma.$queryRaw<{ total: number }[]>(
      countQuery(where),
    );

    const data = await this.prisma.$queryRaw<AllResponseDto[]>(Prisma.sql`
      ${allSelect}
      SELECT *
      FROM all_items items
      ${where}
      ORDER BY "name" ASC, "table" ASC
      LIMIT ${pageSize}
      OFFSET ${offset}
    `);
    return {
      data,
      pagination: returnPagingMetaData(currentPage, pageSize, total),
    };
  }
}
