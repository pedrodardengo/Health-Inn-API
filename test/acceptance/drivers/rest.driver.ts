import * as request from "supertest";
import {AppConn} from "./app.conn";
import {RawEmployee} from "../../example-fatcories/employee-example-builder";


const EMPLOYEE_URL = '/employee'

export class RestDriver {
    private requester: request.SuperTest<request.Test>

    constructor(appConn: AppConn) {
        this.requester = appConn.requester
    }

    async registerEmployee(employeeData: RawEmployee): Promise<void> {
        await this.requester.post(EMPLOYEE_URL)
            .send(employeeData)
            .set('Accept', 'application/json')
    }

    async getEmployee(cpf: string): Promise<RawEmployee> {
        const response = await this.requester.get(`${EMPLOYEE_URL}/${cpf}`)
        return response.body
    }
}