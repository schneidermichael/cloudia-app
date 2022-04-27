import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../../prisma/prisma.service';
import { AwsSimpleDto } from './dto';

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

  async getAwsSimpleDataOptions() {
    try {

      const awsSimple = await this.prisma.awsSimple.findMany({});
      
      let InstanceTypeMap = new Set<String>();
      let MemoryMap = new Set<String>();
      let VCPUSMap = new Set<String>();
      let StorageMap = new Set<String>();
      let NetworkMap = new Set<String>();
      let jObj;


      Object.keys(awsSimple).forEach((value, _key) => {
        InstanceTypeMap.add(awsSimple[value].InstanceType);
        MemoryMap.add(awsSimple[value].Memory);
        VCPUSMap.add(awsSimple[value].VCPUS);
        StorageMap.add(awsSimple[value].Storage);
        NetworkMap.add(awsSimple[value].Network);
      });
      
      jObj["InstanceType"] = InstanceTypeMap;


      return jObj;

    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2008') {
          throw new NotFoundException('No AwsSimple data found!');
        }
      }
      throw error;
    }
  }
}
