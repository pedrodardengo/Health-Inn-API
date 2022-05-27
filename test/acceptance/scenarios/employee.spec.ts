import {AppConn} from "../drivers/app.conn";
import {EmployeeDSL} from "../dsl/employee.dsl";
import {RestDriver} from "../drivers/rest.driver";
import {EmployeeDTO} from "../../../src/employee/dto/employee.dto";
import {clearDB} from "../../tools/database.interactions";

describe('Employees Behavior', () => {
    let employeeDSL: EmployeeDSL
    let appConn: AppConn
    let restDriver: RestDriver

    beforeAll(async () => {
        appConn = new AppConn(3000)
        await appConn.init()
        restDriver = new RestDriver(appConn)
        employeeDSL = new EmployeeDSL(restDriver)
    })

    afterAll(async () => {
        await appConn.stop()
    })

    afterEach(async () => {
        await clearDB()
    });

    it('should be able to register an employee and retrieve the employee that was created', async () => {
        // Arrange
        const employeeData: EmployeeDTO = employeeDSL.generateRandomEmployee()

        // Act
        await employeeDSL.registerEmployee(employeeData)
        const employee = await employeeDSL.getEmployee(employeeData.cpf)

        // Assert
        employeeDSL.assertEmployeesAreTheSame(employee, employeeData)
    })
})