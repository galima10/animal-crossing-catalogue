import { Injectable } from '@nestjs/common';
import { InsectResponseDto } from './insect.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { insectSelect, insectDetails, countQuery } from './insect-query.sql';
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
    weather?: string,
    insectLocationId?: string,
  ): Promise<{
    data: InsectResponseDto[];
    pagination: PaginationMetaData;
  }> {
    const { currentPage, pageSize, offset } = parsePaging(page, size);
    const orderBy = parseSorter(insectsAllowedSorts, sort);

    const searchConditions = parseSearcher(insectsSearchableColumns, q);
    const conditions = [...searchConditions];
    if (weather) {
      conditions.push(
        Prisma.sql`i.weather = ${weather.toUpperCase()}::"Weather"`,
      );
    }
    if (insectLocationId) {
      conditions.push(
        Prisma.sql`i.insect_location_id = ${insectLocationId}`,
      );
    }
    const where = conditions.length
      ? Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}`
      : Prisma.empty;
    const [{ total }] = await this.prisma.$queryRaw<{ total: number }[]>(
      countQuery(where),
    );
    const data = await this.prisma.$queryRaw<InsectResponseDto[]>(Prisma.sql`
      ${insectSelect}
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
        ${insectDetails}
        WHERE i.id = ${id}
      `;
  }
}
