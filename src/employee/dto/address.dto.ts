import {IsString, IsOptional, IsNumberString} from "class-validator";
import {ApiPropertyOptional} from "@nestjs/swagger";


export class AddressDTO {

    @IsString()
    @ApiPropertyOptional({
        description: "Employee's country",
        example: 'Banânia'
    })
    country: string

    @IsString()
    @ApiPropertyOptional({
        description: "Employee's state/province",
        example: 'Massassachutessys'
    })
    state: string

    @IsString()
    @ApiPropertyOptional({
        description: "Employee's city",
        example: 'São Paulo'
    })
    city: string

    @IsString()
    @ApiPropertyOptional({
        description: "Employee's street",
        example: 'Rua da paz'
    })
    street: string

    @IsNumberString()
    @ApiPropertyOptional({
        description: "Employee's building number",
        example: '123'
    })
    number: string

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        description: "Additional information regarding the address",
        example: 'Apto 123'
    })
    complement?: string

    @IsString()
    @ApiPropertyOptional({
        description: "Employee's zip code",
        example: '01001000'
    })
    zipCode: string
}