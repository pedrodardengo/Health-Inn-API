import {IsString, IsOptional, IsNumberString} from "class-validator";


export class AddressDTO {

    @IsString()
    country: string

    @IsString()
    state: string

    @IsString()
    city: string

    @IsString()
    street: string

    @IsNumberString()
    number: string

    @IsOptional()
    @IsString()
    complement?: string

    @IsString()
    zipCode: string
}