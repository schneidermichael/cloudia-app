import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ComputeEngineCalculateRequest {
  @IsNotEmpty()
  @IsString()
  region: string;

  @IsNotEmpty()
  @IsString()
  machineType: string;

  @IsNotEmpty()
  @IsNumber()
  core: number;

  @IsNotEmpty()
  @IsNumber()
  ram: number;
}
