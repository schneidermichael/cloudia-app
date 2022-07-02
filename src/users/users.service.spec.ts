import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UsersService, PrismaService, ConfigService],
      imports: [],
    }).compile();

    service = moduleRef.get<UsersService>(UsersService);
    moduleRef.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
