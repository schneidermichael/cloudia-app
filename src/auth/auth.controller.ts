import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { query } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { ResetPwdDto } from './dto/resetpwd.dto';
import { UserDto } from "../users/dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: UserDto) {
    return this.authService.register(dto);
  }

  @Get('confirm')
  async confirm(@Query('token') token) {
    console.log(token)
    return this.authService.confirm(token);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('resetpwd')
  async resetpwd(@Body() dto: ResetPwdDto) {
    return this.authService.resetpwd(dto.eMail);
  }

  @HttpCode(HttpStatus.OK)
  @Get('confirmpwd')
  async confirmpwd(@Query('email') eMail, @Query('pwd') pwd, @Query('token') token) {
    const pairs = Object.entries(query);
    console.log(pairs)
    return this.authService.confirmpwd(eMail,pwd,token);
  }
}
