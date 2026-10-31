import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SpeciesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.$queryRaw`
      SELECT
        sps.id AS "filterValue",
        sps.name
      FROM species sps
      ORDER BY name
    `;
  }
}
