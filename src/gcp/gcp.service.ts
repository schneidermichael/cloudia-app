import { Injectable } from '@nestjs/common';
import { ComputeEngineCalculateRequest } from './dto/compute-engine-calculate.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GcpService {
  constructor(private prisma: PrismaService) {}

  findAllRegion() {
    return this.prisma.gcpComputeEngine.findMany({
      select: {
        region: true,
      },
      distinct: ['region'],
    });
  }

  findAllImage() {
    return this.prisma.gcpComputeEngine.findMany({
      select: {
        image: true,
      },
      distinct: ['image'],
    });
  }

  computeEngineMachineType() {
    return this.prisma.gcpComputeEngine.findMany({
      select: {
        id: true,
        region: true,
        machine_type: true,
        core: true,
        ram: true,
        price_per_hour: true,
      },
      distinct: ['region', 'machine_type', 'core', 'ram', 'price_per_hour'],
    });
  }

  cloudSqlMachineType() {
    return this.prisma.gcpCloudSql.findMany({
      select: {
        id: true,
        region: true,
        price_per_cpu_hour: true,
        price_per_ram_hour: true,
        price_per_gib: true,
      },
      distinct: [
        'region',
        'price_per_cpu_hour',
        'price_per_ram_hour',
        'price_per_gib',
      ],
    });
  }

  calculateComputeEngine(request: ComputeEngineCalculateRequest) {
    return this.prisma.gcpComputeEngine.findMany({
      where: {
        region: request.region,
        machine_type: request.machineType,
        core: request.core,
        ram: request.ram,
      },
      select: {
        price_per_hour: true,
      },
    });
  }
}
