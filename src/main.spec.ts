import { AppModule } from './app.module';
import { Test } from '@nestjs/testing';

describe('Main', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('Should work', () => {
    expect(2 + 2).toBe(4);
  });
});
