import * as request from 'supertest'
import {AppConn} from './app.conn'
import {EmployeeDTO} from '../../../src/employee/dto/employee.dto'
import {CompanyDTO} from '../../../src/company/dto/company.dto'
import {WorkRelationDTO} from '../../../src/company/dto/work-relation.dto'
import {WorkRelation,} from '../../../src/company/entities/work-relation.entity'
import {UpdateEmployeeDTO,} from '../../../src/employee/dto/update-employee.dto'

const EMPLOYEE_URL = '/employee'
const COMPANY_URL = '/company'
const WORK_URL = '/work'

export class RestDriver {
    private requester: request.SuperTest<request.Test>

    constructor(appConn: AppConn) {
        this.requester = appConn.requester
    }

    async registerEmployee(employeeData: EmployeeDTO): Promise<void> {
        const response = await this.requester.post(EMPLOYEE_URL).send(employeeData).set('Accept', 'application/json')
        this.throwErrorIfNotExpectedStatus(201, response)
    }

    async getEmployee(cpf: string): Promise<EmployeeDTO> {
        const response = await this.requester.get(`${EMPLOYEE_URL}/${cpf}`).set('Accept', 'application/json')
        this.throwErrorIfNotExpectedStatus(200, response)
        return response.body
    }

    async registerCompany(companyDTO: CompanyDTO): Promise<void> {
        const response = await this.requester.post(COMPANY_URL).send(companyDTO).set('Accept', 'application/json')
        this.throwErrorIfNotExpectedStatus(201, response)
    }

    async registerWorkRelation(workRelationDTO: WorkRelationDTO): Promise<void> {
        const response = await this.requester.post(WORK_URL).send(workRelationDTO).set('Accept', 'application/json')
        this.throwErrorIfNotExpectedStatus(201, response)
    }

    async retrieveWorkRelation(
        cnpj: string, cpf: string): Promise<WorkRelation> {
        const response = await this.requester.get(`${WORK_URL}/${cnpj}/${cpf}`).set('Accept', 'application/json')
        this.throwErrorIfNotExpectedStatus(200, response)
        return response.body
    }

    async deleteEmployee(cpf: string) {
        const response = await this.requester.delete(`${EMPLOYEE_URL}/${cpf}`).set('Accept', 'application/json')
        this.throwErrorIfNotExpectedStatus(200, response)
    }

    async updateEmployee(cpf: string, updateEmployeeDTO: UpdateEmployeeDTO) {
        const response = await this.requester.patch(`${EMPLOYEE_URL}/${cpf}`).send(updateEmployeeDTO).set('Accept', 'application/json')
        this.throwErrorIfNotExpectedStatus(200, response)
    }

    private throwErrorIfNotExpectedStatus(
        expectedStatus: number, response: request.Response): void {
        if (response.status != expectedStatus) {
            throw new Error(response.body.message)
        }
    }
}