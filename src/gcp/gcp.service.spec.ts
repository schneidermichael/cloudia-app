import { Test, TestingModule } from '@nestjs/testing';
import { GcpService } from './gcp.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

describe('GcpService', () => {
  let service: GcpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GcpService, PrismaService, ConfigService],
    }).compile();

    service = module.get<GcpService>(GcpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
