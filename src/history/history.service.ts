import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HistoryService {
  constructor(private prisma: PrismaService) {}

  create(createHistoryDto: CreateHistoryDto) {
    return this.prisma.history.create({
      data: {
        userId: createHistoryDto.userId,
        type: createHistoryDto.type,
        providerA: createHistoryDto.providerA,
        providerB: createHistoryDto.providerB,
        priceA: createHistoryDto.priceA,
        priceB: createHistoryDto.priceB,
      },
    });
  }

  findAllByUserId(id: number) {
    return this.prisma.history.findMany({
      where: {
        userId: id,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.history.findUnique({
      where: {
        id: id,
      },
    });
  }

  remove(id: number) {
    return this.prisma.history.delete({
      where: {
        id: id,
      },
    });
  }
}
