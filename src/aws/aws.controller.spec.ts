import { Test, TestingModule } from '@nestjs/testing';
import { AwsController } from './aws.controller';
import { AwsService } from './aws.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

describe('AwsController', () => {
  let controller: AwsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AwsController],
      providers: [AwsService, PrismaService, ConfigService],
    }).compile();

    controller = module.get<AwsController>(AwsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
