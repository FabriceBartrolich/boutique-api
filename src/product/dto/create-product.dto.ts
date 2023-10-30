import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, MaxLength, IsNumber, IsDecimal, Min, IsInt } from "class-validator";

export class CreateProductDto {
    @ApiProperty()
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty()
    @IsInt()
    @Min(0)
    @IsNotEmpty()
    quantity: number;
}