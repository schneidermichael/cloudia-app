import { Test } from '@nestjs/testing';
import { PrismaService } from "./prisma.service";
import { ConfigService } from '@nestjs/config';

describe('PrismaService', () => {
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PrismaService, ConfigService],
      imports: [],
    }).compile();

    prisma = moduleRef.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(prisma).toBeDefined();
  });

});
