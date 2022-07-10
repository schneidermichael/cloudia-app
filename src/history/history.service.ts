import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HistoryService {
  constructor(private prisma: PrismaService) {}

  create(createHistoryDto: CreateHistoryDto) {
    return this.prisma.history.create({
      data: {
        user_id: createHistoryDto.userId,
        type: createHistoryDto.type,
        provider_a: createHistoryDto.providerA,
        provider_b: createHistoryDto.providerB,
        price_a: createHistoryDto.priceA,
        price_b: createHistoryDto.priceB,
      },
    });
  }

  findAllByUserId(id: number) {
    return this.prisma.history.findMany({
      where: {
        user_id: id,
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
