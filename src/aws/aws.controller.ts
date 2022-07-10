import { Controller, Get, Post, Body } from '@nestjs/common';
import { AwsService } from './aws.service';
import { ElasticCloudComputingCalculateRequest } from './dto/elastic-cloud-computing-calculate.dto';

@Controller('aws')
export class AwsController {
  constructor(private readonly service: AwsService) {}

  @Get('region')
  findAllRegion() {
    return this.service.findAllRegion();
  }

  @Get('machine-image')
  findMachineImage() {
    return this.service.findMachineImage();
  }

  @Get('elastic-cloud-computing/instance-type')
  elasticCloudComputingInstanceType() {
    return this.service.elasticCloudComputingInstanceType();
  }

  @Get('relational-database-service/instance-type')
  relationlDatabaseServiceInstanceType() {
    return this.service.relationlDatabaseServiceInstanceType();
  }

  @Post('elastic-cloud-computing/calculate')
  calculateElasticCloudComputing(
    @Body() request: ElasticCloudComputingCalculateRequest,
  ) {
    return this.service.calculateElasticCloudComputing(request);
  }
}
