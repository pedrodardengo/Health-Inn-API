import {AppConn} from '../drivers/app.conn'
import {EmployeeDSL} from '../dsl/employee.dsl'
import {RestDriver} from '../drivers/rest.driver'
import {EmployeeDTO} from '../../../src/employee/dto/employee.dto'
import {clearDB} from '../../tools/database.interactions'
import {EmployeeExampleBuilder} from '../../tools/employee-example-builder'

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
    })

    it(
        'should be able to register an employee and retrieve the employee that was created',
        async () => {
            // Arrange
            const employeeData: EmployeeDTO = employeeDSL.generateRandomEmployee()

            // Act
            await employeeDSL.registerEmployee(employeeData)
            const employee = await employeeDSL.getEmployee(employeeData.cpf)

            // Assert
            employeeDSL.assertEmployeesAreTheSame(employee, employeeData)
        })

    it('should not be able to add employee without phone and email',
        async () => {
            // Arrange
            const employeeData: EmployeeDTO = new EmployeeExampleBuilder().withoutEmail().withoutPhoneNumber().employee

            // Act Assert
            await employeeDSL.assertRegistrationFails(employeeData)
        })

    it('should be able to delete an employee and not be able to retrieve it',
        async () => {
            // Arrange
            const employeeData = await employeeDSL.givenEmployee()

            // Act
            await employeeDSL.deleteEmployee(employeeData.cpf)

            // Assert
            await employeeDSL.assertEmployeeCantBeFound(employeeData.cpf)
        })

    it('should be able to update an employee and retrieve the updated employee',
        async () => {
            // Arrange
            const employeeData = await employeeDSL.givenEmployee()
            const updatedEmployeeData = EmployeeExampleBuilder.generateUpdateEmployeeData()

            // Act
            await employeeDSL.updateEmployee(employeeData.cpf,
                updatedEmployeeData)
            const updatedEmployee = await employeeDSL.getEmployee(
                employeeData.cpf)

            // Assert
            employeeDSL.assertEmployeeWasUpdated(updatedEmployee, employeeData,
                updatedEmployeeData)
        })
})