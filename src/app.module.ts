import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm"
import {EmployeeModule} from "./employee/employee.module";
import {Employee} from "./employee/entities/employee.entity";
import {Address} from "./employee/entities/adress.entity";
import {Company} from "./company/entities/company.entity";
import {WorkRelation} from "./company/entities/work-relation.entity";
import {CompanyModule} from "./company/company.module";

@Module({
  imports: [
     TypeOrmModule.forRoot({
         type: "sqlite",
         database: "db.sqlite",//":memory:",
         entities: [Employee, Address, Company, WorkRelation],
         synchronize: true,
         logging: false
     }),
      EmployeeModule,
      CompanyModule
  ]
})
export class AppModule {}
