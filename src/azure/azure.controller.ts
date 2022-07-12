import { Body, Controller, Get, Post } from '@nestjs/common';
import { AzureService } from './azure.service';
import { VirtualMachineCalculateRequest } from './dto/virtual-machine-calculate.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Microsoft Azure')
@Controller('azure')
export class AzureController {
  constructor(private readonly service: AzureService) {}

  @ApiOperation({ summary: 'Return all region of virtual machine' })
  @Get('virtual-machine/region')
  findAllRegionVirtualMachine() {
    return this.service.findAllRegionVirtualMachine();
  }

  @ApiOperation({ summary: 'Return all region of postgresql' })
  @Get('postgresql/region')
  findAllRegionPostgreSql() {
    return this.service.findAllRegionPostgreSql();
  }

  @ApiOperation({ summary: 'Return all operating system' })
  @Get('operating-system')
  findOperatingSystem() {
    return this.service.findOperatingSystem();
  }

  @ApiOperation({ summary: 'Return all instance serie of virtual machine' })
  @Get('virtual-machine/instance-serie')
  virtualMachineInstanceSerie() {
    return this.service.virtualMachineInstanceSerie();
  }

  @ApiOperation({ summary: 'Return all instance serie of postgresql' })
  @Get('postgresql/instance-serie')
  postgresqlInstanceSerie() {
    return this.service.postgresqlInstanceSerie();
  }

  @ApiOperation({
    summary: 'Calculate your estimated hourly costs for virtual machine',
  })
  @Post('virtual-machine/calculate')
  calculateVirtualMachine(@Body() request: VirtualMachineCalculateRequest) {
    return this.service.calculateComputeEngine(request);
  }
}
