import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InsectLocationService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.$queryRaw`
      SELECT
        *
      FROM insect_locations
      ORDER BY name
    `;
  }
}
