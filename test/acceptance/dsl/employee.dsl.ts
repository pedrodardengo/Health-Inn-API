import {RestDriver} from "../drivers/rest.driver";
import {EmployeeExampleBuilder, RawEmployee} from "../../example-fatcories/employee-example-builder";


export class EmployeeDSL {
    private restDriver: RestDriver

    constructor(restDriver: RestDriver) {
        this.restDriver = restDriver
    }

    public generateRandomEmployee(): RawEmployee {
        const employeeExample = new EmployeeExampleBuilder()
        return employeeExample.employee
    }

    public async registerEmployee(employeeDTO: RawEmployee): Promise<void> {
        return this.restDriver.registerEmployee(employeeDTO)
    }

    public async getEmployee(cpf: string): Promise<RawEmployee> {
        return this.restDriver.getEmployee(cpf)
    }

    public assertEmployeesAreTheSame(employeeDTO1: RawEmployee, employeeDTO2: RawEmployee): void {
        return expect(employeeDTO1).toMatchObject(employeeDTO2)
    }
}