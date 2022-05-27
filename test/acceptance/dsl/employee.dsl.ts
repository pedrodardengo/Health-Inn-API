import {RestDriver} from "../drivers/rest.driver";
import {EmployeeExampleBuilder} from "../../tools/employee-example-builder";
import {EmployeeDTO} from "../../../src/employee/dto/employee.dto";


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

    public async getEmployee(cpf: string): Promise<EmployeeDTO> {
        return this.restDriver.getEmployee(cpf)
    }

    public assertEmployeesAreTheSame(employeeDTO1: EmployeeDTO, employeeDTO2: EmployeeDTO): void {
        return expect(employeeDTO1).toMatchObject(employeeDTO2)
    }
}