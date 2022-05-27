import {EmployeeDTO} from "../dto/employee.dto";
import {Employee} from "../entities/employee.entity";


export abstract class EmployeeRepository {
    abstract create(registerEmployeeDTO: EmployeeDTO): Promise<Employee>

    abstract getByCPF(cpf: string): Promise<Employee>
}