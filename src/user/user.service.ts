import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /* istanbul ignore next */
  async editProfile(id: number, dto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          first_name: dto.first_name || undefined,
          last_name: dto.last_name || undefined,
          email: dto.email || undefined,
        },
      });
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

  async changePassword(user: User, dto: ChangePasswordDto) {
    const oldUser = await this.prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    const match = await argon.verify(oldUser.password, dto.oldPassword);
    if (!match) throw new ForbiddenException('Old Password is incorrect');

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: dto.newPassword
          ? await argon.hash(dto.newPassword)
          : undefined,
      },
    });
    return dto;
  }
}
