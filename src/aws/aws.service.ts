import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ElasticCloudComputingCalculateRequest } from './dto/elastic-cloud-computing-calculate.dto';

@Injectable()
export class AwsService {
  constructor(private prisma: PrismaService) {}

  findAllRegionElasticCloudComputing() {
    return this.prisma.awsElasticComputingCloud.findMany({
      select: {
        region: true,
      },
      distinct: ['region'],
    });
  }

  findAllRegionRelationalDatabaseService() {
    return this.prisma.awsRelationalDatabase.findMany({
      select: {
        region: true,
      },
      distinct: ['region'],
    });
  }

  findMachineImage() {
    return this.prisma.awsElasticComputingCloud.findMany({
      select: {
        machine_image: true,
      },
      distinct: ['machine_image'],
    });
  }

  elasticCloudComputingInstanceType() {
    return this.prisma.awsElasticComputingCloud.findMany({
      select: {
        id: true,
        region: true,
        instance_type: true,
        core: true,
        ram: true,
        price_per_hour: true,
      },
      distinct: ['region', 'instance_type', 'core', 'ram', 'price_per_hour'],
    });
  }

  relationlDatabaseServiceInstanceType() {
    return this.prisma.awsRelationalDatabase.findMany({
      select: {
        id: true,
        region: true,
        instance_type: true,
        core: true,
        ram: true,
        price_per_hour: true,
        price_per_gib: true,
      },
      distinct: [
        'region',
        'instance_type',
        'core',
        'ram',
        'price_per_hour',
        'price_per_gib',
      ],
    });
  }

  calculateElasticCloudComputing(
    request: ElasticCloudComputingCalculateRequest,
  ) {
    return this.prisma.awsElasticComputingCloud.findMany({
      where: {
        region: request.region,
        instance_type: request.instanceType,
        core: request.core,
        ram: request.ram,
      },
      select: {
        price_per_hour: true,
      },
    });
  }
}
