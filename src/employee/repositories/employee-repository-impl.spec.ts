import {Test, TestingModule} from "@nestjs/testing";
import {Repository} from "typeorm";
import {Employee} from "../entities/employee.entity";
import {Address} from "../entities/adress.entity";
import {getRepositoryToken, TypeOrmModule} from "@nestjs/typeorm";
import {EmployeeRepositoryImpl} from "./employee-repository-impl";


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
                    entities: [Employee, Address],
                    synchronize: true,
                    logging: false
                }),
                TypeOrmModule.forFeature([Employee, Address])
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

        })

        it('should create entry on employee table', async () => {
            const employeeData = {}

            const savedEmployee = await employeeRepoImpl.create(employeeData)

            expect(savedEmployee).toMatchObject(employeeData)
        })

    })

    describe('getByCPF', () => {

        it('should fail if no employ with given cpf exists', async () => {

        })

        it('should fail if cpf is empty string', async () => {

        })

        it('should return employee with existing cpf', async () => {

        })

    })

})