import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ResetPwdDto {
  @IsEmail()
  @IsNotEmpty()
  eMail: string;
}
