import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ElasticCloudComputingCalculateRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  region: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  instanceType: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  core: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  ram: number;
}
