import {EmployeeDTO} from "../../src/employee/dto/employee.dto";
import * as cpfGenerator from 'gerador-validador-cpf';


export type RawEmployee = Omit<EmployeeDTO, 'birthday'> & {birthday: string}

export class EmployeeExampleBuilder {
    public employee: RawEmployee

    constructor() {
        this.employee = {
            name: 'A random test name',
            cpf: cpfGenerator.generate(),
            rg: `4445565`,
            birthday: '2000-12-01',
            email: 'test@test.com',
            phoneNumber: '56999553333',
            address: {
                country: 'Brasil',
                state: 'SP',
                city: 'São Paulo',
                street: 'rua teste',
                number: 70,
                zipCode: '89000111'
            }
        }
    }

    withoutEmail() {
        delete this.employee.email
        return this
    }

    withoutPhoneNumber() {
        delete this.employee.phoneNumber
        return this
    }
}