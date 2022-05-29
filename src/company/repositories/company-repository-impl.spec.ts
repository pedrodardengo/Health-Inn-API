import {Test, TestingModule} from '@nestjs/testing'
import {Repository} from 'typeorm'
import {Address} from '../../employee/entities/adress.entity'
import {getRepositoryToken, TypeOrmModule} from '@nestjs/typeorm'
import {Employee} from '../../employee/entities/employee.entity'
import {WorkRelation} from '../entities/work-relation.entity'
import {Company} from '../entities/company.entity'
import {EmployeeExampleBuilder,} from '../../../test/tools/employee-example-builder'
import {CompanyRepositoryImpl} from './company-repository-impl'
import {generateRandomCompanyExample, generateWorkRelationExample,} from '../../../test/tools/example-factory'

describe('CompanyRepositoryImpl Integration test', () => {

    let testingModule: TestingModule
    let companyRepoImpl: CompanyRepositoryImpl
    let workRelationRepo: Repository<WorkRelation>
    let employeeRepo: Repository<Employee>

    beforeEach(async () => {
        testingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'sqlite',
                    database: ':memory:',
                    entities: [Employee, Address, WorkRelation, Company],
                    synchronize: true,
                    logging: false,
                }),
                TypeOrmModule.forFeature(
                    [Employee, Address, WorkRelation, Company]),
            ],
            providers: [
                CompanyRepositoryImpl,
            ],
        }).compile()

        employeeRepo = await testingModule.get(getRepositoryToken(Employee))
        companyRepoImpl = await testingModule.get(CompanyRepositoryImpl)
        workRelationRepo = await testingModule.get(
            getRepositoryToken(WorkRelation))
    })

    afterEach(async () => {
        await testingModule.close()
    })

    describe('create', () => {

        it('should create entry company table', async () => {
            // Arrange
            const companyData = generateRandomCompanyExample()

            // Act
            const savedCompany = await companyRepoImpl.create(companyData)

            // Assert
            expect(savedCompany).toMatchObject(companyData)
        })

        it('should not throw if trying to save already existing company',
            async () => {
                // Arrange
                const companyData = generateRandomCompanyExample()
                await companyRepoImpl.create(companyData)

                // Act
                const company = await companyRepoImpl.create(companyData)

                // Assert
                expect(company).toBeNull()
            })

    })

    describe('createWorkRelation', () => {

        it('should create entry workRelation table', async () => {
            // Arrange
            const employee = await employeeRepo.save(
                new Employee().build(new EmployeeExampleBuilder().employee))
            const company = await companyRepoImpl.create(
                generateRandomCompanyExample())
            const workRelationData = generateWorkRelationExample(employee.cpf,
                company.cnpj, true)
            const workRelation = new WorkRelation().build(employee, company,
                workRelationData)

            // Act
            await companyRepoImpl.createWorkRelation(workRelation)

            // Assert
            const foundWorkRelation = await workRelationRepo.findOne({
                where: {
                    companyId: company.id,
                    employeeId: employee.id,
                },
            })
            delete workRelation.employee
            delete workRelation.company
            expect(foundWorkRelation).toMatchObject(workRelation)
        })

        it('should create entry workRelation table', async () => {
            // Arrange
            const company = await companyRepoImpl.create(
                generateRandomCompanyExample())
            const employee = await employeeRepo.save(
                new Employee().build(new EmployeeExampleBuilder().employee))
            const workRelationData = generateWorkRelationExample(employee.cpf,
                company.cnpj, true)
            const workRelation = new WorkRelation().build(employee, company,
                workRelationData)
            await companyRepoImpl.createWorkRelation(workRelation)

            // Act
            const savedWorkRelation = await companyRepoImpl.createWorkRelation(
                workRelation)

            // Assert
            expect(savedWorkRelation).toBeNull()
        })
    })

    describe('inactivateAllWorkRelationsOfEmployee', () => {

        it('should deactivate any active work relation of a given employee if any',
            async () => {
                // Arrange
                const employee = await employeeRepo.save(
                    new Employee().build(new EmployeeExampleBuilder().employee))

                const company1 = await companyRepoImpl.create(
                    generateRandomCompanyExample())
                const workRelationData1 = generateWorkRelationExample(
                    employee.cpf, company1.cnpj, true)
                const workRelation1 = new WorkRelation().build(employee,
                    company1, workRelationData1)
                await companyRepoImpl.createWorkRelation(workRelation1)

                const company2 = await companyRepoImpl.create(
                    generateRandomCompanyExample())
                const workRelationData2 = generateWorkRelationExample(
                    employee.cpf, company2.cnpj, false)
                const workRelation2 = new WorkRelation().build(employee,
                    company2, workRelationData2)
                await companyRepoImpl.createWorkRelation(workRelation2)

                // Act
                await companyRepoImpl.inactivateAllWorkRelationsOfEmployee(
                    employee)

                // Assert
                const foundWorkRelation1 = await workRelationRepo.findOne({
                    where: {companyId: company1.id, employeeId: employee.id},
                })
                const foundWorkRelation2 = await workRelationRepo.findOne({
                    where: {companyId: company2.id, employeeId: employee.id},
                })
                expect(foundWorkRelation1.isActive).toBeFalsy()
                expect(foundWorkRelation2.isActive).toBeFalsy()
            })
    })

})