import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PersonalityService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.$queryRaw`
      SELECT
        p.id AS "filterValue",
        p.name
      FROM personalities p
      ORDER BY name
    `;
  }
}
