import { Injectable } from '@nestjs/common';
import { SeaCreatureResponseDto } from './sea-creature.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  parsePaging,
  returnPagingMetaData,
  PaginationMetaData,
} from 'src/common/utils/pagination.utils';
import { parseSorter } from 'src/common/utils/sorter.utils';
import { parseSearcher } from 'src/common/utils/searcher.utils';
import { seaCreaturesAllowedSorts } from 'src/common/constants/allowed-sorts.constants';
import { seaCreatureSearchableColumns } from 'src/common/constants/allowed-search.constants';
import { seaCreatureSelect, countQuery } from './sea-creature-query.sql';
import { Prisma } from '@prisma/client';

@Injectable()
export class SeaCreatureService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(
    page?: string,
    size?: string,
    sort?: string | string[],
    q?: string,
  ): Promise<{
    data: SeaCreatureResponseDto[];
    pagination: PaginationMetaData;
  }> {
    const { currentPage, pageSize, offset } = parsePaging(page, size);
    const orderBy = parseSorter(seaCreaturesAllowedSorts, sort);
    const search = parseSearcher(seaCreatureSearchableColumns, q);
    const [{ total }] = await this.prisma.$queryRaw<{ total: number }[]>(
      countQuery(search),
    );
    const data = await this.prisma.$queryRaw<
      SeaCreatureResponseDto[]
    >(Prisma.sql`
      ${seaCreatureSelect}
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
          ${seaCreatureSelect}
          WHERE sc.id = ${id}
        `;
  }
}
