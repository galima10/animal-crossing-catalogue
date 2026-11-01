import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InsectLocationService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.$queryRaw`
      SELECT
        il.id AS "filterValue",
        il.name
      FROM insect_locations il
      ORDER BY name
    `;
  }
}
