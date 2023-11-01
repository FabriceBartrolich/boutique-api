import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateAuthDto {
        @ApiProperty()
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    first_name: string;

    @ApiProperty()
     @IsString()
    @IsEmail()
    @MaxLength(255)
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @MaxLength(60)
    @IsNotEmpty()
    password: string;
}
