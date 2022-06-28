import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { PrismaClientInitializationError } from "@prisma/client/runtime";

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

  it('test cleandb', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    prisma.cleanDb().catch(new PrismaClientInitializationError());
  });

  it('test onModuleInit', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    prisma.onModuleInit().catch(new PrismaClientInitializationError());
  });
});
