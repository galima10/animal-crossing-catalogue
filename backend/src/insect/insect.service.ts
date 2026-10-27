import { Injectable } from '@nestjs/common';
import { InsectResponseDto } from './insect.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { insectSelect, countQuery } from './insect-query.sql';
import {
  parsePaging,
  returnPagingMetaData,
  type PaginationMetaData,
} from 'src/common/utils/pagination.utils';
import { parseSorter } from 'src/common/utils/sorter.utils';
import { parseSearcher } from 'src/common/utils/searcher.utils';
import { insectsAllowedSorts } from 'src/common/constants/allowed-sorts.constants';
import { insectsSearchableColumns } from 'src/common/constants/allowed-search.constants';
import { Prisma } from '@prisma/client';

@Injectable()
export class InsectService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(
    page?: string,
    size?: string,
    sort?: string | string[],
    q?: string,
  ): Promise<{
    data: InsectResponseDto[];
    pagination: PaginationMetaData;
  }> {
    const { currentPage, pageSize, offset } = parsePaging(page, size);
    const orderBy = parseSorter(insectsAllowedSorts, sort);
    const search = parseSearcher(insectsSearchableColumns, q);
    const [{ total }] = await this.prisma.$queryRaw<{ total: number }[]>(
      countQuery(search),
    );
    const data = await this.prisma.$queryRaw<InsectResponseDto[]>(Prisma.sql`
      ${insectSelect}
      ${search}
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
        ${insectSelect}
        WHERE i.id = ${id}
      `;
  }
}
