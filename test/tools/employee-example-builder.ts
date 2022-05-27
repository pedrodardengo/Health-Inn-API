import {EmployeeDTO} from "../../src/employee/dto/employee.dto";
import * as cpfGenerator from 'gerador-validador-cpf';
import {faker} from "@faker-js/faker";


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
                country: faker.name.findName(),
                state: faker.random.alpha(2).toUpperCase(),
                city: faker.name.findName(),
                street: faker.name.findName(),
                number: parseInt(faker.random.numeric(2)) * 10,
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
}