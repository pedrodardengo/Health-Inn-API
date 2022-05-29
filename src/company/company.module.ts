import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {Company} from './entities/company.entity'
import {CompanyRepository} from './repositories/interface.repositories'
import {CompanyController} from './controllers/company.controller'
import {CompanyService} from './services/company.service'
import {CompanyRepositoryImpl} from './repositories/company-repository-impl'
import {WorkRelation} from './entities/work-relation.entity'
import {EmployeeModule} from '../employee/employee.module'

@Module({
    imports: [
        EmployeeModule,
        TypeOrmModule.forFeature([Company, WorkRelation]),
    ],
    providers: [
        {useClass: CompanyRepositoryImpl, provide: CompanyRepository},
        CompanyService,
    ],
    controllers: [CompanyController],
})
export class CompanyModule {
}
