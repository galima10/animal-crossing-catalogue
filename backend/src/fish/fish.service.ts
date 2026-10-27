import { Injectable } from '@nestjs/common';
import { FishResponseDto } from './fish.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { parsePaging } from 'src/common/utils/pagination.utils';
import { parseSorter } from 'src/common/utils/sorter.utils';
import { fishAllowedSorts } from 'src/common/constants/allowed-sorts.constants';
import { fishSearchableColumns } from 'src/common/constants/allowed-search.constants';
import { parseSearcher } from 'src/common/utils/searcher.utils';
import { fishSelect } from './fish-query.sql';

@Injectable()
export class FishService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(
    page?: string,
    size?: string,
    sort?: string | string[],
    q?: string,
  ): Promise<FishResponseDto[]> {
    const { pageSize, offset } = parsePaging(page, size);
    const orderBy = parseSorter(fishAllowedSorts, sort);
    const search = parseSearcher(fishSearchableColumns, q);
    return await this.prisma.$queryRaw`
      ${fishSelect}
      ${search}
      ORDER BY ${orderBy}
      LIMIT ${pageSize}
      OFFSET ${offset}
    `;
  }

  async findOne(id: string) {
    return await this.prisma.$queryRaw`
      ${fishSelect}
      WHERE fi.id = ${id}
    `;
  }
}
