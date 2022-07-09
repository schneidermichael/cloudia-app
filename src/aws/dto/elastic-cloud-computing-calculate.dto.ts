import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ElasticCloudComputingCalculateRequest {
  @IsNotEmpty()
  @IsString()
  region: string;

  @IsNotEmpty()
  @IsString()
  instanceType: string;

  @IsNotEmpty()
  @IsNumber()
  core: number;

  @IsNotEmpty()
  @IsNumber()
  ram: number;
}
