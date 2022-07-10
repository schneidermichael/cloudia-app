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
import { User } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import { JwtGuard } from '../authentication/guard/jwt.guard';
import { GetUserProfile } from '../authentication/decorator/get-user-profile.decorator';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get('profile')
  getProfile(@GetUserProfile() user: User) {
    return user;
  }

  @Put('profile/:id')
  async editProfile(
    @GetUserProfile() user: User,
    @Param('id', new ParseIntPipe()) id,
    @Body() dto: UserDto,
  ) {
    if (user.id != id)
      throw new ForbiddenException('You are not allowed to edit this user');
    return this.usersService.editProfile(id, dto);
  }

  @Delete('profile/:id')
  async deleteProfile(
    @GetUserProfile() user: User,
    @Param('id', new ParseIntPipe()) id,
  ) {
    if (user.id != id)
      throw new ForbiddenException('You are not allowed to delete this user');
    return this.usersService.deleteProfile(id);
  }
}