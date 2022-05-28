import {EmployeeDTO} from "../dto/employee.dto";
import {Employee} from "../entities/employee.entity";
import {UpdateEmployeeDTO} from "../dto/update-employee.dto";


export abstract class EmployeeRepository {
    abstract create(registerEmployeeDTO: EmployeeDTO): Promise<Employee>

    abstract getByCPF(cpf: string): Promise<Employee>

    abstract deleteByCPF(cpf: string): Promise<void>

    abstract update(id: number, updateEmployeeDTO: UpdateEmployeeDTO): Promise<void>
}