import { Test, TestingModule } from '@nestjs/testing';
import { AzureService } from './azure.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

describe('AzureService', () => {
  let service: AzureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AzureService, PrismaService, ConfigService],
    }).compile();

    service = module.get<AzureService>(AzureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
