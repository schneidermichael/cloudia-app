import { Body, Controller, Get, Post } from '@nestjs/common';
import { AzureService } from './azure.service';
import { VirtualMachineCalculateRequest } from './dto/virtual-machine-calculate.dto';

@Controller('azure')
export class AzureController {
  constructor(private readonly service: AzureService) {}

  @Get('region')
  findAllRegion() {
    return this.service.findAllRegion();
  }

  @Get('operating-system')
  findOperatingSystem() {
    return this.service.findOperatingSystem();
  }

  @Get('virtual-machine/instance-serie')
  findAllInstanceSerie() {
    return this.service.findAllInstanceSerie();
  }

  @Post('virtual-machine/calculate')
  calculateVirtualMachine(@Body() request: VirtualMachineCalculateRequest) {
    return this.service.calculateComputeEngine(request);
  }
}
