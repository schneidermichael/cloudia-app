import { Controller, Delete, Get, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUsersProfil } from 'src/auth/decorator';
import { Users } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get('profil')
  getProfil(@GetUsersProfil() users: Users) {
    return users;
  }

  @Patch('profil')
  editProfil() {}

  @Delete('profil')
  deleteProfil() {}
}
