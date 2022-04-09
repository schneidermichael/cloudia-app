import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

 
 export class UserDto {
      
    @IsOptional()
    @IsString()
    title: string

    @IsOptional()
    @IsString()
    firstName: string

    @IsOptional()
    @IsString()
    lastName: string
  
    @IsEmail()
    @IsNotEmpty()
    eMail: string

    @IsOptional()
    @IsString()
    pwd: string
  }