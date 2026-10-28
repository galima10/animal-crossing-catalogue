import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PersonalityService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.$queryRaw`
      SELECT
        *
      FROM personalities
      ORDER BY name
    `;
  }
}
