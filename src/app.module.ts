import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm"
import {EmployeeModule} from "./employee/employee.module";
import {Employee} from "./employee/entities/employee.entity";
import {Address} from "./employee/entities/adress.entity";

@Module({
  imports: [
     TypeOrmModule.forRoot({
         type: "sqlite",
         database: ":memory:",
         entities: [Employee, Address],
         synchronize: true,
         logging: true
     }),
      EmployeeModule
  ]
})
export class AppModule {}
