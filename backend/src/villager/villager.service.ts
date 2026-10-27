import { Injectable } from '@nestjs/common';
import { VillagerResponseDto } from './villager.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  parsePaging,
  returnPagingMetaData,
  type PaginationMetaData,
} from 'src/common/utils/pagination.utils';
import { parseSorter } from 'src/common/utils/sorter.utils';
import { parseSearcher } from 'src/common/utils/searcher.utils';
import { villagersAllowedSorts } from 'src/common/constants/allowed-sorts.constants';
import { villagersSearchableColumns } from 'src/common/constants/allowed-search.constants';
import { villagerSelect, countQuery } from './villager-query.sql';
import { Prisma } from '@prisma/client';

@Injectable()
export class VillagerService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(
    page?: string,
    size?: string,
    sort?: string | string[],
    q?: string,
  ): Promise<{
    data: VillagerResponseDto[];
    pagination: PaginationMetaData;
  }> {
    const { currentPage, pageSize, offset } = parsePaging(page, size);
    const orderBy = parseSorter(villagersAllowedSorts, sort);
    const search = parseSearcher(villagersSearchableColumns, q);
    const [{ total }] = await this.prisma.$queryRaw<{ total: number }[]>(
      countQuery(search),
    );
    const data = await this.prisma.$queryRaw<VillagerResponseDto[]>(Prisma.sql`
        ${villagerSelect}
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
      ${villagerSelect}
      WHERE vi.id = ${id}
    `;
  }
}
