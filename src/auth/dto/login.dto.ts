import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {
   @ApiProperty()
     @IsString()
    @IsEmail()
    @MaxLength(255)
    @IsNotEmpty()
    email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}