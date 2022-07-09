import { Test, TestingModule } from '@nestjs/testing';
import { AzureController } from './azure.controller';
import { AzureService } from './azure.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

describe('AzureController', () => {
  let controller: AzureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AzureController],
      providers: [AzureService, PrismaService, ConfigService],
    }).compile();

    controller = module.get<AzureController>(AzureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
