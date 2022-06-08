import { ForbiddenException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { Http2ServerResponse } from 'http2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private mailService: MailService,
  ) {}

  async register(dto: AuthDto) {
    try {
      const token = Math.floor(100000000 + Math.random() * 9000000).toString();

      const hash = await argon.hash(dto.pwd);
      const user = await this.prisma.users.create({
        data: {
          eMail: dto.eMail,
          pwd: hash,
          confirmToken: token,
        },
      });

      console.log(user.eMail);
      await this.mailService.sendUserConfirmation(user, token);
      return { "user": user.eMail, "status": "please activate" };
     // return this.signToken(user.id, user.eMail);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async confirm(token: string) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          confirmToken: token,
        },
      });
      if (!user) throw new ForbiddenException('Credentials incorrect');
      if (user.isActive) throw new ForbiddenException('User is already activated');

      const user2 = await this.prisma.users.update({
        select: {
          isActive: true,
        },
        where: {
          id: user.id,
        },
        data: {
          isActive: true
        },
      });
      //if (user) delete user.pwd;
      return { "user": user.eMail, "status": "isActivated" };

    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2008') {
          throw new NotFoundException('User not found');
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

    if (!user.isActive) throw new ForbiddenException('User is not activated');

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

  async resetpwd(eMail: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        eMail: eMail,
      },
    });
    if (!user) throw new ForbiddenException('Credentials incorrect');
    if (!user.isActive) throw new ForbiddenException('User is not activated');

    const pwd = Math.floor(100000000 + Math.random() * 9000000).toString();
    await this.mailService.sendUserResetPwd(user, pwd);

    return { "user": eMail, "status": "please check your email" };
  }


  async confirmpwd(email: string, pwd: string, token: string ) {
    const user = await this.prisma.users.findUnique({
      where: {
        eMail: email,
      },
    });
    if (!user) throw new ForbiddenException('Credentials incorrect');
    if (!user.isActive) throw new ForbiddenException('User is not activated');
    if (user.confirmToken !== token)  throw new ForbiddenException('Confirm Token is incorrect');

    try {
      const user2 = await this.prisma.users.update({
        select: {
          pwd: true,
        },
        where: {
          id: user.id,
        },
        data: {
          pwd: await argon.hash(pwd)
        },
      });
      if (user) delete user.pwd;
      return { "user": user.eMail, "status": "pwd resetted" };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2008') {
          throw new NotFoundException('User not found');
        }
      }
      throw error;
    }
  }
}
