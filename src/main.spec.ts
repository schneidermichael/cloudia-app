import { AppModule } from './app.module';
import { Test } from '@nestjs/testing';
import { PrismaService } from './prisma/prisma.service';

describe('Main', () => {
  beforeEach(async () => {
    await Test.createTestingModule({
      imports: [AppModule, PrismaService],
    }).compile();
  });

  it('Should work', () => {
    expect(2 + 2).toBe(4);
  });
});
