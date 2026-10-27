import { Injectable } from '@nestjs/common';
import { InsectResponseDto } from './insect.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { insectSelect } from './insect-query.sql';
import { parsePaging } from 'src/common/utils/pagination.utils';
import { parseSorter } from 'src/common/utils/sorter.utils';
import { parseSearcher } from 'src/common/utils/searcher.utils';
import { insectsAllowedSorts } from 'src/common/constants/allowed-sorts.constants';
import { insectsSearchableColumns } from 'src/common/constants/allowed-search.constants';

@Injectable()
export class InsectService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(
    page?: string,
    size?: string,
    sort?: string | string[],
    q?: string,
  ): Promise<InsectResponseDto[]> {
    const { pageSize, offset } = parsePaging(page, size);
    const orderBy = parseSorter(insectsAllowedSorts, sort);
    const search = parseSearcher(insectsSearchableColumns, q);
    return await this.prisma.$queryRaw`
        ${insectSelect}
        ${search}
        ORDER BY ${orderBy}
        LIMIT ${pageSize}
        OFFSET ${offset}
      `;
  }

  async findOne(id: string) {
    return await this.prisma.$queryRaw`
        ${insectSelect}
        WHERE fi.id = ${id}
      `;
  }
}
