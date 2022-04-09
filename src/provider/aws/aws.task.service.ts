import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { AwsSimpleDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Prisma } from '@prisma/client';

@Injectable()
export class AwsTaskService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  private readonly logger = new Logger(AwsTaskService.name);

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async collectAwsSimpleData() {
    const response = await this.httpService
      .get(this.configService.get('AWS_SIMPLE_API'))
      .subscribe((response) => {
        const json = response.data;

        Object.keys(json).forEach((value, key) => {
          json[value].forEach((AwsSimpleDto) => {
            this.storeAwsSimpleData(AwsSimpleDto);
          });
        });
      });
  }

  async storeAwsSimpleData(dto: AwsSimpleDto) {
    console.log(dto);
    try {
      const user = await this.prisma.awsSimple.create({ data: dto });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ForbiddenException('Already Added');
        }
      }
      throw error;
    }
  }
}
