import {EmployeeDTO} from '../../src/employee/dto/employee.dto'
import * as cpfGenerator from 'gerador-validador-cpf'
import {faker} from '@faker-js/faker'
import {UpdateEmployeeDTO} from '../../src/employee/dto/update-employee.dto'

export class EmployeeExampleBuilder {
    public employee: EmployeeDTO

    constructor() {
        this.employee = {
            name: faker.name.findName(),
            cpf: cpfGenerator.generate(),
            rg: faker.random.numeric(7),
            birthday: '1970-02-22',
            email: 'test@test.com',
            phoneNumber: '27991234567',
            address: {
                country: faker.address.country(),
                state: faker.address.state(),
                city: faker.address.city(),
                street: faker.address.street(),
                number: faker.address.buildingNumber(),
                zipCode: faker.random.numeric(7),
            },
        }
    }

    public static generateUpdateEmployeeData(): UpdateEmployeeDTO {
        return {
            name: faker.name.findName(),
            phoneNumber: faker.phone.phoneNumber(),
            email: faker.internet.email(),
            address: {
                street: faker.address.street(),
                zipCode: faker.address.zipCode(),
            },
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