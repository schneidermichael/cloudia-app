import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UserDto } from '../user/dto/user.dto';
import { AuthenticationDto } from './dto/authentication.dto';
import { ApiExcludeController } from '@nestjs/swagger';
import { ResendConformationDto } from './dto/resend-conformation';

@ApiExcludeController()
@Controller('authentication')
export class AuthenticationController {
  constructor(private service: AuthenticationService) {}

  @Post('register')
  register(@Body() dto: UserDto) {
    return this.service.register(dto);
  }

  @Get('confirm')
  confirm(@Query('token') token) {
    return this.service.confirm(token);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: AuthenticationDto) {
    return this.service.login(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.service.resetPassword(dto.email);
  }

  @HttpCode(HttpStatus.OK)
  @Post('resend-conformation')
  resendConformation(@Body() dto: ResendConformationDto) {
    return this.service.resendConformation(dto.email, dto.host);
  }

  @HttpCode(HttpStatus.OK)
  @Get('confirm-password')
  confirmPassword(
    @Query('email') email,
    @Query('password') password,
    @Query('token') token,
  ) {
    return this.service.confirmPassword(email, password, token);
  }
}
