import { Injectable } from '@nestjs/common';
import { FishResponseDto } from './fish.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FishService {
  constructor(private readonly prisma: PrismaService) {}
  findAll(page?: string, size?: string, sort?: string | string[], q?: string) {
    return this.prisma.$queryRaw`SELECT * FROM fishs LIMIT 5`;
  }

  findOne(id: string) {
    return `This action returns a #${id} fish`;
  }
}
