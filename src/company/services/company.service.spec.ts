import {CompanyService} from './company.service'
import {Test, TestingModule} from '@nestjs/testing'
import {CompanyRepositoryImpl} from '../repositories/company-repository-impl'
import {CompanyRepository} from '../repositories/interface.repositories'
import {createMock, DeepMocked} from '@golevelup/nestjs-testing'
import {EmployeeService} from '../../employee/services/employee.service'
import {Company} from '../entities/company.entity'
import {ConflictException, NotFoundException} from '@nestjs/common'
import {CompanyDTO} from '../dto/company.dto'

describe('CompanyService', () => {
    let companyService: CompanyService
    let companyRepositoryMock: DeepMocked<CompanyRepositoryImpl>
    let employeeServiceMock: DeepMocked<EmployeeService>

    beforeEach(async () => {

        companyRepositoryMock = createMock<CompanyRepositoryImpl>()
        employeeServiceMock = createMock<EmployeeService>()
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                {useValue: companyRepositoryMock, provide: CompanyRepository},
                {useValue: employeeServiceMock, provide: EmployeeService},
                CompanyService,
            ],
        }).compile()

        companyService = module.get<CompanyService>(CompanyService)
    })

    it('should be defined', () => {
        expect(companyService).toBeDefined()
    })

    describe('registerCompany', () => {

        it('should return company after creating it', async () => {
            // Arrange
            companyRepositoryMock.create.mockResolvedValue(
                {cnpj: 'test'} as unknown as Promise<Company>,
            )

            // Act
            const result = await companyService.registerCompany(
                new CompanyDTO())

            // Assert
            expect(result).toBeDefined()
        })

        it(
            'should throw ConflictException if repository returns null meaning conflict',
            async () => {
                // Arrange
                companyRepositoryMock.create.mockReturnValueOnce(
                    null as unknown as Promise<Company>,
                )

                // Act
                const request = companyService.registerCompany(
                    new CompanyDTO())

                // Assert
                await expect(request).rejects.toThrow(ConflictException)
            })
    })

    describe('getCompanyByCNPJ', () => {

        it('should return company', async () => {
            // Arrange
            companyRepositoryMock.getCompanyByCNPJ.mockReturnValueOnce(
                {cnpj: 'test'} as unknown as Promise<Company>,
            )

            // Act
            const result = await companyService.getCompanyByCNPJ('123456789')

            // Assert
            expect(result).toBeDefined()
        })

        it('should throw if company is not found', async () => {
            // Arrange
            companyRepositoryMock.getCompanyByCNPJ.mockReturnValueOnce(
                undefined as unknown as Promise<Company>,
            )

            // Act
            const request = companyService.getCompanyByCNPJ('123456789')

            // Assert
            await expect(request).rejects.toThrow(NotFoundException)
        })
    })

})
