import { PrismaClient } from '.prisma/client';
import { ForbiddenException, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get('DATABASE_URL'),
        },
      },
    });
    //console.log(configService.get('DATABASE_URL'))
  }

  async onModuleInit() {
    try {
      const admin = await this.users.findUnique({
        where: {
          eMail: this.configService.get('ADMIN_MAIL'),
        },
      });
      if (admin) return;

      const hash = await argon.hash(this.configService.get('ADMIN_PWD'));
      await this.users.create({
        data: {
          eMail: this.configService.get('ADMIN_MAIL'),
          pwd: hash,
        },
      });
      console.log('ADMIN ADDED!');
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ForbiddenException('FINE! Admin already added');
        }
      }
      throw error;
    }
  }

  cleanDb() {
    return this.$transaction([this.users.deleteMany()]);
  }
}
