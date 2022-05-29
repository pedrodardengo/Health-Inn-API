import {IsCNPJ, IsCPF} from 'brazilian-class-validator'
import {IsBoolean, IsString} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'

export class WorkRelationDTO {

    @IsCNPJ()
    @ApiProperty({
        description: 'Company\'s CNPJ',
        example: '14722745862138',
    })
    companyCNPJ: string

    @IsCPF()
    @ApiProperty({
        description: 'Employee\'s CPF',
        example: '69755305050',
    })
    employeeCPF: string

    @IsBoolean()
    @ApiProperty({
        description: 'Determines whether a work relation is active or not',
        example: true,
    })
    isActive: boolean

    @IsString()
    @ApiProperty({
        description: 'Company\'s sector where the employee works',
        example: 'IT',
    })
    sector: string

    @IsString()
    @ApiProperty({
        description: 'Employee\'s job at the company',
        example: 'Software Engineer',
    })
    position: string

}