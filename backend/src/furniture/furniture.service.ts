import { Injectable } from '@nestjs/common';
import { FurnitureResponseDto } from './furniture.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  parsePaging,
  returnPagingMetaData,
  type PaginationMetaData,
} from 'src/common/utils/pagination.utils';
import { parseSorter } from 'src/common/utils/sorter.utils';
import { parseSearcher } from 'src/common/utils/searcher.utils';
import { furnituresAllowedSorts } from 'src/common/constants/allowed-sorts.constants';
import { furnituresSearchableColumns } from 'src/common/constants/allowed-search.constants';
import {
  furnitureSelect,
  countQuery,
  furnitureExtraSearchConditions,
} from './furniture-query.sql';
import { Prisma } from '@prisma/client';

@Injectable()
export class FurnitureService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(
    page?: string,
    size?: string,
    sort?: string | string[],
    q?: string,
  ): Promise<{
    data: FurnitureResponseDto[];
    pagination: PaginationMetaData;
  }> {
    const { currentPage, pageSize, offset } = parsePaging(page, size);
    const orderBy = parseSorter(furnituresAllowedSorts, sort);
    const extraConditions = q?.trim() ? furnitureExtraSearchConditions(q) : [];
    const search = parseSearcher(
      furnituresSearchableColumns,
      q,
      extraConditions,
    );
    const [{ total }] = await this.prisma.$queryRaw<{ total: number }[]>(
      countQuery(search),
    );
    const data = await this.prisma.$queryRaw<FurnitureResponseDto[]>(Prisma.sql`
      ${furnitureSelect}
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
      ${furnitureSelect}
      WHERE fu.id = ${id}
    `;
  }
}
