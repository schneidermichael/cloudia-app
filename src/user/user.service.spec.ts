import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';

describe('UsersService', () => {
  let service: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UserService, PrismaService, ConfigService],
      imports: [],
    }).compile();

    service = moduleRef.get<UserService>(UserService);
    moduleRef.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
