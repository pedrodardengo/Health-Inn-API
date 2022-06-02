import {Module} from '@nestjs/common'
import {EmployeeModule} from './employee/employee.module'
import {CompanyModule} from './company/company.module'
import {provideDBModuleForRoot} from "./database.config";

@Module({
    imports: [
        provideDBModuleForRoot() ,
        EmployeeModule,
        CompanyModule,
    ],
})
export class AppModule {
}
