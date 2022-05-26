import {IsCNPJ} from "brazilian-class-validator";
import {IsString} from "class-validator";


export class CompanyDTO {

    @IsCNPJ()
    cnpj: string

    @IsString()
    name: string

}