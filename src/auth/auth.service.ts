import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.pwd);
      const user = await this.prisma.users.create({
        data: {
          eMail: dto.eMail,
          pwd: hash,
        },
      });
      return this.signToken(user.id, user.eMail);
    } 
    catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    const user = await this.prisma.users.findUnique({
      where: {
        eMail: dto.eMail,
      },
    });
    if (!user) throw new ForbiddenException('Credentials incorrect');

    const match = await argon.verify(user.pwd, dto.pwd);
    if (!match) throw new ForbiddenException('Credentials incorrect');

    return this.signToken(user.id, user.eMail);
  }

  async signToken(userId: number, eMail: string) {
    const payload = {
      sub: userId,
      eMail: eMail,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30m',
      secret: secret,
    });
    return {
      access_token: token,
    };
  }
}
