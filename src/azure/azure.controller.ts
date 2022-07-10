import { Body, Controller, Get, Post } from '@nestjs/common';
import { AzureService } from './azure.service';
import { VirtualMachineCalculateRequest } from './dto/virtual-machine-calculate.dto';

@Controller('azure')
export class AzureController {
  constructor(private readonly service: AzureService) {}

  @Get('virtual-machine/region')
  findAllRegionVirtualMachine() {
    return this.service.findAllRegionVirtualMachine();
  }

  @Get('postgresql/region')
  findAllRegionPostgreSql() {
    return this.service.findAllRegionPostgreSql();
  }

  @Get('operating-system')
  findOperatingSystem() {
    return this.service.findOperatingSystem();
  }

  @Get('virtual-machine/instance-serie')
  virtualMachineInstanceSerie() {
    return this.service.virtualMachineInstanceSerie();
  }

  @Get('postgresql/instance-serie')
  postgresqlInstanceSerie() {
    return this.service.postgresqlInstanceSerie();
  }

  @Post('virtual-machine/calculate')
  calculateVirtualMachine(@Body() request: VirtualMachineCalculateRequest) {
    return this.service.calculateComputeEngine(request);
  }
}
