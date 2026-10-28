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
    personalityId?: string,
    speciesId?: string,
  ): Promise<{
    data: VillagerResponseDto[];
    pagination: PaginationMetaData;
  }> {
    const { currentPage, pageSize, offset } = parsePaging(page, size);
    const orderBy = parseSorter(villagersAllowedSorts, sort);

    const searchConditions = parseSearcher(villagersSearchableColumns, q);
    const conditions = [...searchConditions];
    if (personalityId) {
      conditions.push(Prisma.sql`vi.personality_id = ${personalityId}`);
    }
    if (speciesId) {
      conditions.push(Prisma.sql`vi.species_id = ${speciesId}`);
    }
    const where = conditions.length
      ? Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}`
      : Prisma.empty;
    const [{ total }] = await this.prisma.$queryRaw<{ total: number }[]>(
      countQuery(where),
    );
    const data = await this.prisma.$queryRaw<VillagerResponseDto[]>(Prisma.sql`
        ${villagerSelect}
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
      ${villagerSelect}
      WHERE vi.id = ${id}
    `;
  }
}
