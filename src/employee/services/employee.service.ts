import {Injectable, NotFoundException} from '@nestjs/common'
import {EmployeeDTO} from '../dto/employee.dto'
import {EmployeeRepository} from '../repositories/interface.repository'
import {Employee} from '../entities/employee.entity'
import {EMPLOYEE_MESSAGES} from '../../exceptions/messages.exceptions'
import {UpdateEmployeeDTO} from '../dto/update-employee.dto'

@Injectable()
export class EmployeeService {

    constructor(
        private employeeRepo: EmployeeRepository,
    ) {
    }

    async createEmployee(registerEmployeeDTO: EmployeeDTO): Promise<void> {
        await this.employeeRepo.create(registerEmployeeDTO)
    }

    async getEmployeeByCPF(cpf: string): Promise<Employee> {
        const employee = await this.employeeRepo.getByCPF(cpf)
        if (!employee) throw new NotFoundException(
            EMPLOYEE_MESSAGES.NOT_FOUND(cpf))
        return employee
    }

    async deleteEmployeeByCPF(cpf: string): Promise<void> {
        await this.employeeRepo.deleteByCPF(cpf)
    }

    async updateEmployee(
        cpf: string, updateEmployeeDTO: UpdateEmployeeDTO): Promise<void> {
        const employee = await this.employeeRepo.getByCPF(cpf)
        await this.employeeRepo.update(employee.id, updateEmployeeDTO)
    }
}
