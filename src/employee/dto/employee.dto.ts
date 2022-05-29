import {IsEmail, IsNumberString, IsString, ValidateIf} from 'class-validator'
import {IsCPF} from 'brazilian-class-validator'
import {AddressDTO} from './address.dto'
import {IsStringDate} from '@nestjsi/class-validator'
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger'

export class EmployeeDTO {

    @IsCPF()
    @ApiProperty({
        description: 'Employee\'s CPF',
        example: '69755305050',
    })
    cpf: string

    @IsNumberString()
    @ApiProperty({
        description: 'Employee\'s RG',
        example: '1234567',
    })
    rg: string

    @IsString()
    @ApiProperty({
        description: 'Employee\'s full name',
        example: 'Abbot Costello da Silva',
    })
    name: string

    @IsStringDate()
    @ApiProperty({
        description: 'A date in string format',
        example: '1970-10-22',
    })
    birthday: string

    @ApiProperty({
        description: 'Employee\'s address',
        type: AddressDTO,
        example: {
            street: 'Rua da Paz',
            number: '123',
            country: 'Banânia',
            city: 'São Paulo',
            state: 'Massassachutessys',
            complement: 'Apto. 123',
            zipCode: '01001000',
        },
    })
    address: AddressDTO

    @ValidateIf(
        dto => !dto.email || dto.phoneNumber,
        {message: 'Either email or phone number must be informed'},
    )
    @IsString()
    @ApiPropertyOptional({
        description: 'Employee\'s phone number',
        example: '5587933331111',
    })
    phoneNumber?: string

    @ValidateIf(
        dto => !dto.phoneNumber || dto.email,
        {message: 'Either email or phone number must be informed'},
    )
    @IsEmail()
    @ApiPropertyOptional({
        description: 'Employee\'s email',
        example: 'abbott@arrived.com',
    })
    email?: string
}
