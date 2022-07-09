import { Injectable } from '@nestjs/common';
import { VirtualMachineCalculateRequest } from './dto/virtual-machine-calculate.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AzureService {
  constructor(private prisma: PrismaService) {}

  findAllRegion() {
    return this.prisma.azureVirtualMachine.findMany({
      select: {
        region: true,
      },
      distinct: ['region'],
    });
  }

  findOperatingSystem() {
    return this.prisma.azureVirtualMachine.findMany({
      select: {
        operating_system: true,
      },
      distinct: ['operating_system'],
    });
  }

  findAllInstanceSerie() {
    return this.prisma.azureVirtualMachine.findMany({
      select: {
        id: true,
        region: true,
        instance_serie: true,
        core: true,
        ram: true,
        storage: true,
        price_per_hour: true,
      },
      distinct: [
        'region',
        'instance_serie',
        'core',
        'ram',
        'storage',
        'price_per_hour',
      ],
    });
  }

  calculateComputeEngine(request: VirtualMachineCalculateRequest) {
    return this.prisma.azureVirtualMachine.findMany({
      where: {
        region: request.region,
        instance_serie: request.instanceSerie,
        core: request.core,
        ram: request.ram,
        storage: request.storage,
      },
      select: {
        price_per_hour: true,
      },
    });
  }
}
