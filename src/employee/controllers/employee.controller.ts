import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {EmployeeDTO} from "../dto/employee.dto";
import {EmployeeService} from "../services/employee.service";
import {Employee} from "../entities/employee.entity";
import {UpdateEmployeeDTO} from "../dto/update-employee.dto";

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

    @Delete('/:cpf')
    async deleteEmployee(@Param('cpf') cpf: string): Promise<void> {
        await this.employeeService.deleteEmployeeByCPF(cpf)
    }

    @Put('/:cpf')
    async updateEmployee(
        @Param('cpf') cpf: string,
        @Body() updateEmployeeDTO: UpdateEmployeeDTO
    ): Promise<void> {
        await this.employeeService.updateEmployee(cpf, updateEmployeeDTO)
    }
}
