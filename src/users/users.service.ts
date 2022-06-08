import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async editProfil(id: number, dto: UserDto) {
    try {
      const user = await this.prisma.users.update({
        select: {
          id: true,
          title: Boolean(dto.title),
          firstName: Boolean(dto.firstName),
          lastName: Boolean(dto.lastName),
          eMail: true,
          pwd: Boolean(dto.pwd),
        },
        where: {
          id: id,
        },
        data: {
          title: dto.title || undefined,
          firstName: dto.firstName || undefined,
          lastName: dto.lastName || undefined,
          eMail: dto.eMail || undefined,
          pwd:(dto.pwd) ? await argon.hash(dto.pwd) : undefined || undefined,
        },
      });
      if (user) delete user.pwd;
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

  async deleteProfil(id: number) {
    try {
      const user = await this.prisma.users.delete({
        where: {
          id: id,
        },
      });
      if (user) delete user.pwd;
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
