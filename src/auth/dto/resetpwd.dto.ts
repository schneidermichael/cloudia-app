import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPwdDto {
  @IsEmail()
  @IsNotEmpty()
  eMail: string;
}
