import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  eMail: string;

  @IsString()
  @IsNotEmpty()
  pwd: string;
}
