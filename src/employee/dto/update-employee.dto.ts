import {OmitType, PartialType} from "@nestjs/swagger";
import {EmployeeDTO} from "./employee.dto";
import {AddressDTO} from "./address.dto";

class UpdateAddressDTO extends PartialType(AddressDTO) {}

export class UpdateEmployeeDTO extends PartialType(OmitType(EmployeeDTO, ['cpf', 'address'] as const)) {
    address?: UpdateAddressDTO;
}