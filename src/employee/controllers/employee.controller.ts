import {Body, Controller, Delete, Get, Param, Post, Patch} from '@nestjs/common';
import {EmployeeDTO} from "../dto/employee.dto";
import {EmployeeService} from "../services/employee.service";
import {Employee} from "../entities/employee.entity";
import {UpdateEmployeeDTO} from "../dto/update-employee.dto";
import {ApiCreatedResponse, ApiOperation} from "@nestjs/swagger";

@Controller('/employee')
export class EmployeeController {

    constructor(private employeeService: EmployeeService) {}

    @Post()
    @ApiOperation({
        summary: 'Creates a single employee',
        tags: ['Employees Functionalities'],
    })
    @ApiCreatedResponse({ description: 'The Employee record has been successfully created.'})
    async registerEmployee(@Body() registerEmployeeDTO: EmployeeDTO): Promise<void> {
        await this.employeeService.createEmployee(registerEmployeeDTO)
    }

    @Get('/:cpf')
    @ApiOperation({
        summary: 'Get a single Employee identified by its CPF',
        tags: ['Employees Functionalities']
    })
    async getEmployee(@Param('cpf') cpf: string): Promise<Employee> {
        return await this.employeeService.getEmployeeByCPF(cpf)
    }

    @Delete('/:cpf')
    @ApiOperation({
        summary: 'Delete a single Employee identified by its CPF',
        tags: ['Employees Functionalities']
    })
    async deleteEmployee(@Param('cpf') cpf: string): Promise<void> {
        await this.employeeService.deleteEmployeeByCPF(cpf)
    }

    @Patch('/:cpf')
    @ApiOperation({
        summary: 'Updates a single Employee identified by its CPF',
        tags: ['Employees Functionalities']
    })
    async updateEmployee(
        @Param('cpf') cpf: string,
        @Body() updateEmployeeDTO: UpdateEmployeeDTO
    ): Promise<void> {
        await this.employeeService.updateEmployee(cpf, updateEmployeeDTO)
    }
}
