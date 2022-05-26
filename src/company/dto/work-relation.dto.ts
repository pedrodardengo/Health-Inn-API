import {IsCNPJ, IsCPF} from "brazilian-class-validator";
import {IsBoolean, IsString} from "class-validator";


export class WorkRelationDTO {

    @IsCNPJ()
    companyCNPJ: string;

    @IsCPF()
    employeeCPF: string

    @IsBoolean()
    isActive: boolean

    @IsString()
    sector: string

    @IsString()
    position: string

}