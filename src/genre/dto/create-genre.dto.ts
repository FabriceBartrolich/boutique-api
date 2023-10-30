import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateGenreDto {
    @ApiProperty()
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    name: string;
}

