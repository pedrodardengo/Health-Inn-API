import {RestDriver} from '../drivers/rest.driver'
import {EmployeeExampleBuilder} from '../../tools/employee-example-builder'
import {EmployeeDTO} from '../../../src/employee/dto/employee.dto'
import {UpdateEmployeeDTO,} from '../../../src/employee/dto/update-employee.dto'
import {EMPLOYEE_MESSAGES} from '../../../src/exceptions/messages.exceptions'

export class EmployeeDSL {
    private restDriver: RestDriver

    constructor(restDriver: RestDriver) {
        this.restDriver = restDriver
    }

    public generateRandomEmployee(): EmployeeDTO {
        const employeeExample = new EmployeeExampleBuilder()
        return employeeExample.employee
    }

    public async registerEmployee(employeeDTO: EmployeeDTO): Promise<void> {
        return this.restDriver.registerEmployee(employeeDTO)
    }

    public async getEmployee(
        cpf: string,
    ): Promise<EmployeeDTO> {
        return this.restDriver.getEmployee(cpf)
    }

    public assertEmployeesAreTheSame(
        employeeDTO1: EmployeeDTO, employeeDTO2: EmployeeDTO): void {
        return expect(employeeDTO1).toMatchObject(employeeDTO2)
    }

    public async givenEmployee(): Promise<EmployeeDTO> {
        const employee = this.generateRandomEmployee()
        await this.registerEmployee(employee)
        return employee
    }

    public async deleteEmployee(cpf: string): Promise<void> {
        return await this.restDriver.deleteEmployee(cpf)
    }

    async updateEmployee(
        cpf: string, updateEmployeeDTO: UpdateEmployeeDTO): Promise<void> {
        await this.restDriver.updateEmployee(cpf, updateEmployeeDTO)
    }

    assertEmployeeWasUpdated(
        updatedEmployee: EmployeeDTO,
        employeeData: EmployeeDTO,
        updatedEmployeeData: UpdateEmployeeDTO,
    ): void {
        expect(updatedEmployee).toMatchObject(Object.assign(employeeData, updatedEmployeeData))
    }

    async assertEmployeeCantBeFound(cpf: string): Promise<void> {
        await expect(this.getEmployee(cpf)).rejects.toThrow(EMPLOYEE_MESSAGES.NOT_FOUND(cpf))
    }

    async assertRegistrationFails(employeeData: EmployeeDTO) {
        await expect(this.registerEmployee(employeeData)).rejects.toThrow()
    }
}