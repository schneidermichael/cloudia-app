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
      
      //TODO EXTRACT ALL MEMORY / VCPUS etc TYPES and return it
      
      
      return 'TODO';
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
