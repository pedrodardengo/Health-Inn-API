import {IsString, IsOptional} from "class-validator";
import {IsPositiveInt} from "@nestjsi/class-validator";


export class AddressDTO {

    @IsString()
    country: string

    @IsString()
    state: string

    @IsString()
    city: string

    @IsString()
    street: string

    @IsPositiveInt()
    number: number

    @IsOptional()
    @IsString()
    complement?: string

    @IsString()
    zipCode: string
}