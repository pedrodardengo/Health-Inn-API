import {Test, TestingModule} from "@nestjs/testing";
import {Employee} from "../entities/employee.entity";
import {Address} from "../entities/adress.entity";
import {getRepositoryToken, TypeOrmModule} from "@nestjs/typeorm";
import {EmployeeRepositoryImpl} from "./employee-repository-impl";
import {EmployeeExampleBuilder} from "../../../test/tools/employee-example-builder";
import {WorkRelation} from "../../company/entities/work-relation.entity";
import {Company} from "../../company/entities/company.entity";
import {Repository} from "typeorm";


describe('EmployeeRepositoryImpl Integration test', () => {

    let testingModule: TestingModule
    let employeeRepoImpl: EmployeeRepositoryImpl
    let addressRepo: Repository<Address>

    beforeEach(async () => {
        testingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: "sqlite",
                    database: ":memory:",
                    entities: [Employee, Address, WorkRelation, Company],
                    synchronize: true,
                    logging: false
                }),
                TypeOrmModule.forFeature([Employee, Address, WorkRelation, Company])
            ],
            providers: [
                EmployeeRepositoryImpl
            ]
        }).compile()

        employeeRepoImpl = await testingModule.get(EmployeeRepositoryImpl)
        addressRepo = await testingModule.get(getRepositoryToken(Address))
    })

    afterEach(async () => {
        await testingModule.close()
    })

    describe('Create', () => {

        it('should create entry on address table', async () => {
            // Arrange
            const employeeData = new EmployeeExampleBuilder().employee

            // Act
            const savedEmployee = await employeeRepoImpl.create(employeeData)

            // Assert
            const address = await addressRepo.findOne(savedEmployee.address.id)
            expect(address).toMatchObject(employeeData.address)
        })


        it('should create entry on employee table', async () => {
            // Arrange
            const employeeData = new EmployeeExampleBuilder().employee

            // Act
            const savedEmployee = await employeeRepoImpl.create(employeeData)

            // Assert
            expect(savedEmployee).toMatchObject(employeeData)
        })
        it('should not throw if trying to create an already existing employee', async () => {
            // Arrange
            const employeeData = new EmployeeExampleBuilder().employee
            await employeeRepoImpl.create(employeeData)

            // Act
            const employee = await employeeRepoImpl.create(employeeData)

            // Assert
            expect(employee).toBeNull()
        })
    })

    describe('getByCPF', () => {

        it('should return undefined if passed empty string or non existing CPF', async () => {
            // Act
            const result1 = await employeeRepoImpl.getByCPF('22222222222')
            const result2 = await employeeRepoImpl.getByCPF('')

            // Assert
            expect(result1).toBeUndefined()
            expect(result2).toBeUndefined()
        })

        it('should return employee with existing cpf', async () => {
            // Arrange
            const employeeData = new EmployeeExampleBuilder().employee
            await employeeRepoImpl.create(employeeData)

            // Act
            const foundEmployee = await employeeRepoImpl.getByCPF(employeeData.cpf)

            // Assert
            expect(foundEmployee).toMatchObject(employeeData)
        })
    })

    describe('deleteByCPF', () => {

        it ('should delete employee with existing cpf', async () => {
            // Arrange
            const employeeData = new EmployeeExampleBuilder().employee
            await employeeRepoImpl.create(employeeData)

            // Act
            await employeeRepoImpl.deleteByCPF(employeeData.cpf)

            // Assert
            const foundEmployee = await employeeRepoImpl.getByCPF(employeeData.cpf)
            expect(foundEmployee).toBeUndefined()
        })

        it('should not fail if employee that should be deleted does not exist', async () => {
            // Act Assert
            await employeeRepoImpl.deleteByCPF('22222222222')
        })
    })

    describe('Update', () => {

        it('should update employee', async () => {
            // Arrange
            const employeeData = new EmployeeExampleBuilder().employee
            const employeeId = (await employeeRepoImpl.create(employeeData)).id
            const updateEmployeeData = EmployeeExampleBuilder.generateUpdateEmployeeData()

            // Act
            await employeeRepoImpl.update(employeeId, updateEmployeeData)

            // Assert
            const foundEmployee = await employeeRepoImpl.getByCPF(employeeData.cpf)
            expect(foundEmployee).toMatchObject(Object.assign(employeeData, updateEmployeeData))
        })

        it('should not fail if employee that should be updated does not exist', async () => {
            // Arrange
            const updateEmployeeData = EmployeeExampleBuilder.generateUpdateEmployeeData()

            // Act Assert
            await employeeRepoImpl.update(42, updateEmployeeData)
        })

    })

})