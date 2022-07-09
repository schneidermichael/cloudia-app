import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AwsSimpleDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AwsService {
  constructor(private prisma: PrismaService) {}

  async getAwsSimpleDataAll() {
    try {
      const awsSimple: AwsSimpleDto[] = await this.prisma.awsSimple.findMany(
        {},
      );
      return awsSimple;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2008') {
          throw new NotFoundException('No AwsSimple data found!');
        }
      }
      throw error;
    }
  }

  /* istanbul ignore next */
  async getAwsSimpleDataProduct(product: string) {
    try {
      const awsSimple: AwsSimpleDto = await this.prisma.awsSimple.findUnique({
        where: {
          InstanceType: product,
        },
      });
      return awsSimple;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2008') {
          throw new NotFoundException('No AwsSimple data found!');
        }
      }
      throw error;
    }
  }

  /* istanbul ignore next */
  async getAwsSimpleDataOptions() {
    try {
      const awsSimple = await this.prisma.awsSimple.findMany({});

      
      const InstanceTypeMap:string[] = []; // = new Set<String>();
      const MemoryMap:string[] = [];
      const VCPUSMap:string[] = [];
      const StorageMap:string[] = [];
      const NetworkMap:string[] = [];


      var i = 0;
      Object.keys(awsSimple).forEach((value, _key) => {
        if (!(InstanceTypeMap.includes(awsSimple[value].InstanceType)))
          InstanceTypeMap.push(awsSimple[value].InstanceType);
        if (!(MemoryMap.includes(awsSimple[value].Memory)))
          MemoryMap.push(awsSimple[value].Memory);
        if (!(VCPUSMap.includes(awsSimple[value].VCPUS)))
          VCPUSMap.push(awsSimple[value].VCPUS);
        if (!(StorageMap.includes(awsSimple[value].Storage)))
          StorageMap.push(awsSimple[value].Storage);
        if (!(NetworkMap.includes(awsSimple[value].Network)))
          NetworkMap.push(awsSimple[value].Network);
        i++;
      });

      return {
        "InstanceType": InstanceTypeMap,
        "MemoyMap": MemoryMap,
        "VCPUSMap": VCPUSMap,
        "StorageMap": StorageMap,
        "NetworkMap": NetworkMap
      }

    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2008') {
          throw new NotFoundException('No AwsSimple data found!');
        }
      }
      throw error;
    }
  }

  async calculate(product: string, hours: number) {
    try {
      const query = await this.prisma.awsSimple.findUnique({
        where: {
          InstanceType: product,
        },
      });
      if (!query) throw new ForbiddenException('Product not found!');



      return { "price": query.MonthlyPrice / 750 * hours };

    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2008') {
          throw new NotFoundException('Product not found');
        }
      }
      throw error;
    }
  }
}
