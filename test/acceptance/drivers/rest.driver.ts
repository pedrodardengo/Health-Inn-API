import * as request from "supertest";
import {AppConn} from "./app.conn";
import {EmployeeDTO} from "../../../src/employee/dto/employee.dto";
import {CompanyDTO} from "../../../src/company/dto/company.dto";
import {WorkRelationDTO} from "../../../src/company/dto/work-relation.dto";
import {WorkRelation} from "../../../src/company/entities/work-relation.entity";


const EMPLOYEE_URL = '/employee'
const COMPANY_URL = '/company'
const WORK_URL = '/work'

export class RestDriver {
    private requester: request.SuperTest<request.Test>

    constructor(appConn: AppConn) {
        this.requester = appConn.requester
    }

    async registerEmployee(employeeData: EmployeeDTO): Promise<void> {
        await this.requester.post(EMPLOYEE_URL)
            .send(employeeData)
            .set('Accept', 'application/json')
    }

    async getEmployee(cpf: string): Promise<EmployeeDTO> {
        const response = await this.requester.get(`${EMPLOYEE_URL}/${cpf}`)
        return response.body
    }

    async registerCompany(companyDTO: CompanyDTO): Promise<void> {
        await this.requester.post(COMPANY_URL)
            .send(companyDTO)
            .set('Accept', 'application/json')
    }

    async registerWorkRelation(workRelationDTO: WorkRelationDTO): Promise<void> {
        await this.requester.post(WORK_URL)
            .send(workRelationDTO)
            .set('Accept', 'application/json')
    }

    async retrieveWorkRelation(cnpj: string, cpf: string): Promise<WorkRelation> {
        const response = await this.requester.get(`${WORK_URL}/${cnpj}/${cpf}`)
        return response.body
    }
}