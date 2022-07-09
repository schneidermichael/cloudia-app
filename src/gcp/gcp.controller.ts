import { Controller, Get, Post, Body } from '@nestjs/common';
import { GcpService } from './gcp.service';
import { ComputeEngineCalculateRequest } from './dto/compute-engine-calculate.dto';

@Controller('gcp')
export class GcpController {
  constructor(private readonly service: GcpService) {}

  @Get('region')
  findAllRegion() {
    return this.service.findAllRegion();
  }

  @Get('image')
  findAllImage() {
    return this.service.findAllImage();
  }

  @Get('compute-engine/machine-type')
  findAllMachineType() {
    return this.service.findAllMachineType();
  }

  @Post('compute-engine/calculate')
  calculateComputeEngine(@Body() request: ComputeEngineCalculateRequest) {
    return this.service.calculateComputeEngine(request);
  }
}
