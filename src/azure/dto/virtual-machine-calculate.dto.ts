import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class VirtualMachineCalculateRequest {
  @IsNotEmpty()
  @IsString()
  region: string;

  @IsNotEmpty()
  @IsString()
  instanceSerie: string;

  @IsNotEmpty()
  @IsNumber()
  core: number;

  @IsNotEmpty()
  @IsNumber()
  ram: number;

  @IsNotEmpty()
  @IsNumber()
  storage: number;
}
