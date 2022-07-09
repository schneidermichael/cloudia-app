import { Test, TestingModule } from '@nestjs/testing';
import { GcpController } from './gcp.controller';
import { GcpService } from './gcp.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

describe('GcpController', () => {
  let controller: GcpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GcpController],
      providers: [GcpService, PrismaService, ConfigService],
    }).compile();

    controller = module.get<GcpController>(GcpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
