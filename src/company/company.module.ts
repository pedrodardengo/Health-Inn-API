import {Module} from '@nestjs/common'
import {Company} from './entities/company.entity'
import {CompanyRepository} from './repositories/interface.repositories'
import {CompanyController} from './controllers/company.controller'
import {CompanyService} from './services/company.service'
import {CompanyRepositoryImpl} from './repositories/company-repository-impl'
import {WorkRelation} from './entities/work-relation.entity'
import {EmployeeModule} from '../employee/employee.module'
import {provideDBModuleForFeature} from "../database.config";

@Module({
    imports: [
        EmployeeModule,
        provideDBModuleForFeature([Company, WorkRelation]),
    ],
    providers: [
        {useClass: CompanyRepositoryImpl, provide: CompanyRepository},
        CompanyService,
    ],
    controllers: [CompanyController],
})
export class CompanyModule {
}
