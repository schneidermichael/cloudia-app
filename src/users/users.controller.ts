import { Controller, Delete, Get, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthDto } from './dto';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get('')
  getUserById() {}

  @Delete('')
  deleteUserById() {}
}
