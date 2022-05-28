import {CompanyService} from "./company.service";
import {Test, TestingModule} from "@nestjs/testing";
import {CompanyRepositoryImpl} from "../repositories/company-repository-impl";
import {CompanyRepository} from "../repositories/interface.repositories";
import {createMock, DeepMocked} from '@golevelup/nestjs-testing';
import {EmployeeService} from "../../employee/services/employee.service";

describe('CompanyService', () => {
    let companyService: CompanyService;
    let companyRepositoryMock: DeepMocked<CompanyRepositoryImpl>;
    let employeeServiceMock: DeepMocked<EmployeeService>;

    beforeEach(async () => {

        companyRepositoryMock = createMock<CompanyRepositoryImpl>();
        employeeServiceMock = createMock<EmployeeService>();
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                { useValue: companyRepositoryMock, provide: CompanyRepository },
                { useValue: employeeServiceMock, provide: EmployeeService },
                CompanyService
            ],
        }).compile();

        companyService = module.get<CompanyService>(CompanyService);
    });

    it('should be defined', () => {
        expect(companyService).toBeDefined();
    });
});
