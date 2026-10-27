import { Injectable } from '@nestjs/common';
import { FishResponseDto } from './fish.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { parsePaging } from 'src/common/utils/pagination.utils';
import { parseSorter } from 'src/common/utils/sorter.utils';
import { fishAllowedSorts } from 'src/common/constants/allowed-sorts.constants';
import { fishSearchableColumns } from 'src/common/constants/allowed-search.constants';
import { parseSearcher } from 'src/common/utils/searcher.utils';

@Injectable()
export class FishService {
  constructor(private readonly prisma: PrismaService) {}
  findAll(page?: string, size?: string, sort?: string | string[], q?: string) {
    const { pageSize, offset } = parsePaging(page, size);
    const orderBy = parseSorter(fishAllowedSorts, sort);
    const search = parseSearcher(fishSearchableColumns, q);
    return this.prisma.$queryRaw`
      SELECT 
        fi.id,
        fi.name,
        fi.image_url,
        fi.selling_price,
        fi.monthly_avalaibility,
        spl.name as sea_place_name
      FROM fishs fi
      LEFT JOIN sea_places spl ON spl.id = fi.sea_place_id
      ${search}
      ORDER BY ${orderBy}
      LIMIT ${pageSize}
      OFFSET ${offset}
    `;
  }

  findOne(id: string) {
    return `This action returns a #${id} fish`;
  }
}
