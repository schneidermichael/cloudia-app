import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

 
 export class UserDto {
      
    @IsOptional()
    @IsString()
    title

    @IsOptional()
    @IsString()
    firstName

    @IsOptional()
    @IsString()
    lastName
  
    @IsEmail()
    @IsNotEmpty()
    eMail

    @IsOptional()
    @IsString()
    pwd
  }