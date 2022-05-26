import {AppConn} from "../drivers/app.conn";
import {EmployeeDSL} from "../dsl/employee.dsl";
import {getConnection} from "typeorm";
import {RestDriver} from "../drivers/rest.driver";
import {RawEmployee} from "../../example-fatcories/employee-example-builder";

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
        const entities = getConnection().entityMetadatas;
        for (const entity of entities) {
            const repository = getConnection().getRepository(entity.name)
            await repository.clear()
        }
    });

    it('should be able to register an employee and retrieve the employee that was created', async () => {
        // Arrange
        const employeeData: RawEmployee = employeeDSL.generateRandomEmployee()

        // Act
        await employeeDSL.registerEmployee(employeeData)
        const employee = await employeeDSL.getEmployee(employeeData.cpf)

        // Assert
        employeeDSL.assertEmployeesAreTheSame(employee, employeeData)
    })

    it("", async () => {})
})