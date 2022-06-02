import {Module} from '@nestjs/common'
import {EmployeeService} from './services/employee.service'
import {EmployeeController} from './controllers/employee.controller'
import {Employee} from './entities/employee.entity'
import {Address} from './entities/adress.entity'
import {EmployeeRepositoryImpl} from './repositories/employee-repository-impl'
import {EmployeeRepository} from './repositories/interface.repository'
import {provideDBModuleForFeature} from "../database.config";

@Module({
    imports: [provideDBModuleForFeature([Employee, Address])],
    providers: [
        {useClass: EmployeeRepositoryImpl, provide: EmployeeRepository},
        EmployeeService,
    ],
    exports: [EmployeeService],
    controllers: [EmployeeController],
})
export class EmployeeModule {
}
