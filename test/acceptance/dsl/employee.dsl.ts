import {RestDriver} from "../drivers/rest.driver";
import {EmployeeExampleBuilder} from "../../tools/employee-example-builder";
import {EmployeeDTO} from "../../../src/employee/dto/employee.dto";
import {UpdateEmployeeDTO} from "../../../src/employee/dto/update-employee.dto";


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
        options: {assertNotFound: boolean} = {assertNotFound: false}
    ): Promise<EmployeeDTO> {
        return this.restDriver.getEmployee(cpf, options.assertNotFound)
    }

    public assertEmployeesAreTheSame(employeeDTO1: EmployeeDTO, employeeDTO2: EmployeeDTO): void {
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

    async assertEmployeeCantBeFound(cpf: string): Promise<void> {
        await this.getEmployee(cpf, {assertNotFound: true})
    }

    async updateEmployee(cpf: string, updateEmployeeDTO: UpdateEmployeeDTO): Promise<void> {
        await this.restDriver.updateEmployee(cpf, updateEmployeeDTO)
    }

    assertEmployeeWasUpdated(
        updatedEmployee: EmployeeDTO,
        employeeData: EmployeeDTO,
        updatedEmployeeData: UpdateEmployeeDTO
    ): void {
        expect(updatedEmployee).toMatchObject(Object.assign(employeeData, updatedEmployeeData))
    }
}