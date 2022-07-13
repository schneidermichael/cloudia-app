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
import { JwtGuard } from '../authentication/guard/jwt.guard';
import { GetUserProfile } from '../authentication/decorator/get-user-profile.decorator';
import { ApiExcludeController } from '@nestjs/swagger';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiExcludeController()
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
    @Body() dto: UpdateUserDto,
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

  @Put('change-password')
  async changePassword(
    @GetUserProfile() user: User,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(user, dto);
  }
}
