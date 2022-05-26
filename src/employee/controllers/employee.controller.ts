import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {EmployeeDTO} from "../dto/employee.dto";
import {EmployeeService} from "../services/employee.service";
import {Employee} from "../entities/employee.entity";

@Controller('/employee')
export class EmployeeController {

    constructor(private employeeService: EmployeeService) {}

    @Post()
    async registerEmployee(@Body() registerEmployeeDTO: EmployeeDTO): Promise<void> {
        await this.employeeService.createEmployee(registerEmployeeDTO)
    }

    @Get('/:cpf')
    async getEmployee(@Param('cpf') cpf: string): Promise<Employee> {
        return await this.employeeService.getEmployeeByCPF(cpf)
    }
}
