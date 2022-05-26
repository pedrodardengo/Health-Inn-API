import {Injectable} from '@nestjs/common';
import {EmployeeDTO} from "../dto/employee.dto";
import {EmployeeRepository} from "../repositories/interface.repository";
import {Employee} from "../entities/employee.entity";

@Injectable()
export class EmployeeService {

    constructor(
        private employeeRepo: EmployeeRepository
    ) {}

    async createEmployee(registerEmployeeDTO: EmployeeDTO): Promise<void> {
        await this.employeeRepo.create(registerEmployeeDTO)
    }

    async getEmployeeByCPF(cpf: string): Promise<Employee> {
        return await this.employeeRepo.getByCPF(cpf)
    }

}
