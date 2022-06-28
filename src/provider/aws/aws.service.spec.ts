import { Test } from '@nestjs/testing';
import { AwsService } from './aws.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

describe('AwsService', () => {
  let service: AwsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AwsService, PrismaService, ConfigService],
      imports: [],
    }).compile();

    service = moduleRef.get<AwsService>(AwsService);
    moduleRef.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
