import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /* istanbul ignore next */
  async editProfile(id: number, dto: UserDto) {
    try {
      const user = await this.prisma.user.update({
        select: {
          id: true,
          first_name: Boolean(dto.first_name),
          last_name: Boolean(dto.last_name),
          email: true,
          password: Boolean(dto.password),
        },
        where: {
          id: id,
        },
        data: {
          first_name: dto.first_name || undefined,
          last_name: dto.last_name || undefined,
          email: dto.email || undefined,
          password: dto.password ? await argon.hash(dto.password) : undefined,
        },
      });
      if (user) delete user.password;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2008') {
          throw new NotFoundException('User not found');
        }
      }
      throw error;
    }
  }

  async deleteProfile(id: number) {
    try {
      const user = await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
      if (user) delete user.password;
      return user;
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