import {EmployeeDTO} from "../../src/employee/dto/employee.dto";
import * as cpfGenerator from 'gerador-validador-cpf';
import {faker} from "@faker-js/faker";
import {UpdateEmployeeDTO} from "../../src/employee/dto/update-employee.dto";


export class EmployeeExampleBuilder {
    public employee: EmployeeDTO

    constructor() {
        this.employee = {
            name: faker.name.findName(),
            cpf: cpfGenerator.generate(),
            rg: faker.random.numeric(7),
            birthday: faker.date.birthdate().toISOString(),
            email: faker.internet.email(),
            phoneNumber: faker.phone.phoneNumber(),
            address: {
                country: faker.address.country(),
                state: faker.address.state(),
                city: faker.address.city(),
                street: faker.address.street(),
                number: faker.address.buildingNumber(),
                zipCode: faker.random.numeric(7)
            }
        }
    }

    withoutEmail(): EmployeeExampleBuilder {
        delete this.employee.email
        return this
    }

    withoutPhoneNumber(): EmployeeExampleBuilder {
        delete this.employee.phoneNumber
        return this
    }

    public static generateUpdateEmployeeData(): UpdateEmployeeDTO {
        return {
            name: faker.name.findName(),
            phoneNumber: faker.phone.phoneNumber(),
            email: faker.internet.email(),
            address: {
                street: faker.address.street(),
                zipCode: faker.address.zipCode()
            }
        }
    }
}