import { Controller, Get, Post, Body } from '@nestjs/common';
import { AwsService } from './aws.service';
import { ElasticCloudComputingCalculateRequest } from './dto/elastic-cloud-computing-calculate.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Amazon Web Services')
@Controller('aws')
export class AwsController {
  constructor(private readonly service: AwsService) {}

  @ApiOperation({ summary: 'Return all region of elastic cloud computing' })
  @Get('elastic-cloud-computing/region')
  findAllRegionElasticCloudComputing() {
    return this.service.findAllRegionElasticCloudComputing();
  }

  @ApiOperation({ summary: 'Return all region of relational database service' })
  @Get('relational-database-service/region')
  findAllRegionRelationalDatabaseService() {
    return this.service.findAllRegionRelationalDatabaseService();
  }

  @ApiOperation({ summary: 'Return all machine images' })
  @Get('machine-image')
  findMachineImage() {
    return this.service.findMachineImage();
  }

  @ApiOperation({
    summary: 'Return all instance type of elastic cloud computing',
  })
  @Get('elastic-cloud-computing/instance-type')
  elasticCloudComputingInstanceType() {
    return this.service.elasticCloudComputingInstanceType();
  }

  @ApiOperation({
    summary: 'Return all isntance type of relational database service',
  })
  @Get('relational-database-service/instance-type')
  relationlDatabaseServiceInstanceType() {
    return this.service.relationlDatabaseServiceInstanceType();
  }

  @ApiOperation({
    summary:
      'Calculate your estimated hourly costs for elastic cloud computing',
  })
  @Post('elastic-cloud-computing/calculate')
  calculateElasticCloudComputing(
    @Body() request: ElasticCloudComputingCalculateRequest,
  ) {
    return this.service.calculateElasticCloudComputing(request);
  }
}
