import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async editProfil(id: number, dto: UserDto) {
//    try {
//      const user = await this.prisma.users.update({
//        where: {
//          id: id,
//       },
//        data: undefined,
//      });
//      if (user) delete user.pwd;
//      return user;
//    } catch (error) {
//     if (error instanceof PrismaClientKnownRequestError) {
//        if (error.code == 'P2008') {
//          throw new NotFoundException('User not found');
//        }
//      }
//      throw error;
//    }
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
