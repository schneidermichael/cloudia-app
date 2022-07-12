import { Controller, Get, Post, Body } from '@nestjs/common';
import { GcpService } from './gcp.service';
import { ComputeEngineCalculateRequest } from './dto/compute-engine-calculate.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Google Cloud')
@Controller('gcp')
export class GcpController {
  constructor(private readonly service: GcpService) {}

  @ApiOperation({ summary: 'Return all regions of compute engine' })
  @Get('compute-engine/region')
  findAllRegionComputeEngine() {
    return this.service.findAllRegionComputeEngine();
  }

  @ApiOperation({ summary: 'Return all regions of cloud sql' })
  @Get('cloud-sql/region')
  findAllRegionCloudSql() {
    return this.service.findAllRegionCloudSql();
  }

  @ApiOperation({ summary: 'Return all images' })
  @Get('image')
  findAllImage() {
    return this.service.findAllImage();
  }

  @ApiOperation({ summary: 'Return all machine types of compute engine' })
  @Get('compute-engine/machine-type')
  computeEngineMachineType() {
    return this.service.computeEngineMachineType();
  }

  @ApiOperation({ summary: 'Return all machine types of cloud sql' })
  @Get('cloud-sql/machine-type')
  cloudSqlMachineType() {
    return this.service.cloudSqlMachineType();
  }

  @ApiOperation({
    summary: 'Calculate your estimated hourly costs for compute engine',
  })
  @Post('compute-engine/calculate')
  calculateComputeEngine(@Body() request: ComputeEngineCalculateRequest) {
    return this.service.calculateComputeEngine(request);
  }
}
