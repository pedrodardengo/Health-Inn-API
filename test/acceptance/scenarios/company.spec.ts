import {EmployeeDSL} from "../dsl/employee.dsl";
import {AppConn} from "../drivers/app.conn";
import {RestDriver} from "../drivers/rest.driver";
import {clearDB} from "../../tools/database.interactions";
import {CompanyDTO} from "../../../src/company/dto/company.dto";
import {EmployeeDTO} from "../../../src/employee/dto/employee.dto";
import {CompanyDSL} from "../dsl/company.dsl";
import {WorkRelationDTO} from "../../../src/company/dto/work-relation.dto";


describe('Companies Behavior', () => {
    let restDriver: RestDriver
    let appConn: AppConn
    let employeeDSL: EmployeeDSL
    let companyDSL: CompanyDSL

    beforeAll(async () => {
        appConn = new AppConn(3000)
        await appConn.init()
        restDriver = new RestDriver(appConn)
        employeeDSL = new EmployeeDSL(restDriver)
        companyDSL = new CompanyDSL(restDriver)
    })

    afterEach(async () => {
        await clearDB()
    })

    afterAll(async () => {
        await appConn.stop()
    })

    it('should add a work relation for a specific company and employee and retrieve it later', async () => {
        // Arrange
        const companyData: CompanyDTO = companyDSL.generateRandomCompany()
        const employeeData: EmployeeDTO = employeeDSL.generateRandomEmployee()
        await companyDSL.registerCompany(companyData)
        await employeeDSL.registerEmployee(employeeData)
        const workRelateData: WorkRelationDTO = companyDSL.generateRandomWorkRelation(
            employeeData,
            companyData,
            true
        )

        // Act
        await companyDSL.registerWorkRelation(workRelateData)
        const workRelation = await companyDSL.retrieveWorkRelation(companyData.cnpj, employeeData.cpf)

        // Assert
        companyDSL.assertWorkRelationMatch(workRelation, workRelateData)
    })
})