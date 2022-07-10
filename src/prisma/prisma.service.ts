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
  }

  /* istanbul ignore next */
  async onModuleInit() {
    try {
      const admin = await this.user.findUnique({
        where: {
          email: this.configService.get('ADMIN_MAIL'),
        },
      });
      if (admin) return;

      const hash = await argon.hash(this.configService.get('ADMIN_PWD'));
      await this.user.create({
        data: {
          email: this.configService.get('ADMIN_MAIL'),
          first_name: 'Doe',
          last_name: 'Joe',
          country_name: 'Austria',
          password: hash,
          is_active: true,
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

  /* istanbul ignore next */
  cleanDb() {
    return this.$transaction([this.user.deleteMany()]);
  }
}
