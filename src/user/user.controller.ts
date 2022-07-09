import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guard';
import { GetUsersProfil } from '../auth/decorator';
import { User } from '@prisma/client';
import { UserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get('profil')
  async getProfil(@GetUsersProfil() profil: User) {
    return profil;
  }

  @Put('profil/:id')
  async editProfil(
    @GetUsersProfil() profil: User,
    @Param('id', new ParseIntPipe()) id,
    @Body() dto: UserDto,
  ) {
    console.log(profil);
    console.log(dto);
    if (profil.id != id)
      throw new ForbiddenException('You are not allowed to edit this user');
    return this.usersService.editProfil(id, dto);
  }

  @Delete('profil/:id')
  async deleteProfil(
    @GetUsersProfil() profil: User,
    @Param('id', new ParseIntPipe()) id,
  ) {
    if (profil.id != id)
      throw new ForbiddenException('You are not allowed to delete this user');
    return this.usersService.deleteProfil(id);
  }
}
