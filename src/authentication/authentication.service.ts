import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { UserDto } from '../user/dto/user.dto';
import { AuthenticationDto } from './dto/authentication.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private mailService: MailService,
  ) {}

  /* istanbul ignore next */
  async register(dto: UserDto) {
    try {
      const token = Math.floor(100000000 + Math.random() * 9000000).toString();
      const hash = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          first_name: dto.first_name,
          last_name: dto.last_name,
          email: dto.email,
          password: hash,
          country_name: dto.country_name,
          confirm_token: token,
        },
      });

      console.log(dto.host);
      await this.mailService.sendUserConfirmation(user, token, dto.host);
      return { user: user.email, status: 'please activate' };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async resendConformation(email: string, host: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!user) throw new ForbiddenException('User not available');
      await this.mailService.sendUserConfirmation(
        user,
        user.confirm_token,
        host,
      );
      return { user: user.email, status: 'please activate' };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2008') {
          throw new NotFoundException('User not found');
        }
      }
      throw error;
    }
  }

  /* istanbul ignore next */
  async confirm(token: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          confirm_token: token,
        },
      });
      if (!user) throw new ForbiddenException('Credentials incorrect');
      if (user.is_active)
        throw new ForbiddenException('User is already activated');

      await this.prisma.user.update({
        select: {
          is_active: true,
        },
        where: {
          id: user.id,
        },
        data: {
          is_active: true,
        },
      });
      return { user: user.email, status: 'isActivated' };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2008') {
          throw new NotFoundException('User not found');
        }
      }
      throw error;
    }
  }

  /* istanbul ignore next */
  async login(dto: AuthenticationDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('Credentials incorrect');

    const match = await argon.verify(user.password, dto.password);
    if (!match) throw new ForbiddenException('Credentials incorrect');

    if (!user.is_active) throw new ForbiddenException('User is not activated');

    return this.loginToken(user.id, user.email);
  }

  /* istanbul ignore next */
  async loginToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email: email,
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

  async resetPassword(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) throw new ForbiddenException('Credentials incorrect');
    if (!user.is_active) throw new ForbiddenException('User is not activated');

    const password = Math.floor(100000000 + Math.random() * 9000000).toString();

    await this.prisma.user.update({
      select: {
        password: true,
      },
      where: {
        id: user.id,
      },
      data: {
        password: await argon.hash(password),
      },
    });

    return { password: password };
  }

  /* istanbul ignore next */
  async confirmPassword(email: string, password: string, token: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) throw new ForbiddenException('Credentials incorrect');
    if (!user.is_active) throw new ForbiddenException('User is not activated');
    if (user.confirm_token !== token)
      throw new ForbiddenException('Confirm Token is incorrect');

    try {
      await this.prisma.user.update({
        select: {
          password: true,
        },
        where: {
          id: user.id,
        },
        data: {
          password: await argon.hash(password),
        },
      });
      if (user) delete user.password;
      return { user: user.email, status: 'password reset' };
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
