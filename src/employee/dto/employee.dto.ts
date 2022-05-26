import { IsEmail, IsString, ValidateIf } from "class-validator"
import {IsCPF} from "brazilian-class-validator";
import { AddressDTO } from "./address.dto"
import {IsStringDate} from "@nestjsi/class-validator";

export class EmployeeDTO {

    @IsCPF()
    cpf: string

    @IsString()
    rg: string

    @IsString()
    name: string

    @IsStringDate()
    birthday: string

    address: AddressDTO

    @ValidateIf(dto => !dto.email || dto.phoneNumber)
    @IsString()
    phoneNumber: string

    @ValidateIf(dto => !dto.phoneNumber || dto.email)
    @IsEmail()
    email: string
}
