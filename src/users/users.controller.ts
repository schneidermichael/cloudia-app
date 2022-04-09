import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/guard';
import { GetUsersProfil } from '../auth/decorator';
import { Users } from '@prisma/client';
import { UserDto } from './dto/user.dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get('profil')
  async getProfil(@GetUsersProfil() profil: Users) {
    return profil
  }

  @Patch('profil/:id')
  async editProfil(@GetUsersProfil() profil: Users, @Param('id', new ParseIntPipe()) id, @Body() user: UserDto) {
    if (profil.id != id) throw new ForbiddenException('You are not allowed to edit this user')
    return await this.usersService.editProfil(id, user)
  }

  @Delete('profil/:id')
  async deleteProfil(@GetUsersProfil() profil: Users, @Param('id', new ParseIntPipe()) id) {
    if (profil.id != id) throw new ForbiddenException('You are not allowed to delete this user')
    return await this.usersService.deleteProfil(id)
  }
}
