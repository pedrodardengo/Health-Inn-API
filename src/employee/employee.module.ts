import { Module } from '@nestjs/common';
import { EmployeeService } from './services/employee.service';
import { EmployeeController } from './controllers/employee.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "./entities/employee.entity";
import { Address } from "./entities/adress.entity";
import { EmployeeRepositoryImpl } from "./repositories/employee-repository-impl.service";
import { EmployeeRepository } from "./repositories/interface.repository";


@Module({
  imports: [TypeOrmModule.forFeature([Employee, Address])],
  providers: [
      { useClass: EmployeeRepositoryImpl, provide: EmployeeRepository },
      EmployeeService
  ],
  controllers: [EmployeeController]
})
export class EmployeeModule {}
