import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SeaPlaceService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.$queryRaw`
      SELECT
        *
      FROM sea_places
      ORDER BY name
    `;
  }
}
