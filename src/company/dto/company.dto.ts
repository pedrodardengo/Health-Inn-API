import {IsCNPJ} from "brazilian-class-validator";
import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class CompanyDTO {

    @IsCNPJ()
    @ApiProperty({
        description: "Company's CNPJ",
        example: '14722745862138'
    })
    cnpj: string

    @IsString()
    @ApiProperty({
        description: "Company's Name",
        example: 'Waters Inc'
    })
    name: string

}