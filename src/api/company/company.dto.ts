import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CompanyDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    readonly CUIT: number;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly companyName: string;
}