import { Cron, CronExpression } from '@nestjs/schedule';
import { ForbiddenException, Injectable, Logger } from '@nestjs/common';

import { AwsSimpleDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../../prisma/prisma.service';

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
    const response = this.httpService
      .get(this.configService.get('AWS_SIMPLE_API'))
      .subscribe((response) => {
        const json = response.data;

        Object.keys(json).forEach((value, _key) => {
          json[value].forEach((AwsSimpleDto) => {
            this.storeAwsSimpleData(AwsSimpleDto);
          });
        });
      });
  }

  async storeAwsSimpleData(dto: AwsSimpleDto) {
    try {
      await this.prisma.awsSimple.create({ data: dto });
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
