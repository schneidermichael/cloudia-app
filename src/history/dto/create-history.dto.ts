import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHistoryDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  providerA: string;

  @IsNotEmpty()
  @IsString()
  providerB: string;

  @IsNotEmpty()
  @IsNumber()
  priceA: number;

  @IsNotEmpty()
  @IsNumber()
  priceB: number;
}
