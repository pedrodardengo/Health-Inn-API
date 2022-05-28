//import {CompanyService} from "./company.service";
//import {Test, TestingModule} from "@nestjs/testing";
//import {CompanyRepositoryImpl} from "../repositories/company-repository-impl";
//import {CompanyRepository} from "../repositories/interface.repositories";
//import {createMock, DeepMocked} from '@golevelup/nestjs-testing';
//
//describe('CompanyService', () => {
//    let companyService: CompanyService;
//    let companyRepositoryMock: DeepMocked<CompanyRepositoryImpl>;
//
//    beforeEach(async () => {
//
//        companyRepositoryMock = createMock<CompanyRepositoryImpl>();
//        const module: TestingModule = await Test.createTestingModule({
//            imports: [],
//            providers: [
//                { useClass: companyRepositoryMock, provide: CompanyRepository },
//                CompanyService
//            ],
//        }).compile();
//
//        companyService = module.get<CompanyService>(CompanyService);
//    });
//
//    it('should be defined', () => {
//        expect(companyService).toBeDefined();
//    });
//});
