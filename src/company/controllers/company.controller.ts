import {Body, Controller, Get, Param, Post} from '@nestjs/common'
import {CompanyDTO} from '../dto/company.dto'
import {CompanyService} from '../services/company.service'
import {WorkRelationDTO} from '../dto/work-relation.dto'
import {ApiOperation} from '@nestjs/swagger'

@Controller()
export class CompanyController {
    constructor(private companyService: CompanyService) {
    }

    @Post('/company')
    @ApiOperation({
        summary: 'Creates a single company',
        tags: ['Company Functionalities'],
    })
    async registerCompany(@Body() company: CompanyDTO): Promise<void> {
        await this.companyService.registerCompany(company)
    }

    @Post('/work')
    @ApiOperation({
        summary: 'Creates a "work relation" between a company and an employee',
        tags: ['Company Functionalities'],
    })
    async addWorkRelationBetweenCompanyAndEmployee(@Body() workRelationDTO: WorkRelationDTO): Promise<void> {
        await this.companyService.addWorkRelation(workRelationDTO)
    }

    @Get('/work/:cnpj/:cpf')
    @ApiOperation({
        summary: 'Gets a work relation between a company identified by its CNPJ and an employee identified by its CPF',
        tags: ['Company Functionalities'],
    })
    async getWorkRelationBetweenCompanyAndEmployee(
        @Param('cpf') employeeCPF: string,
        @Param('cnpj') companyCNPJ: string,
    ): Promise<WorkRelationDTO> {
        return await this.companyService.getWorkRelation(employeeCPF,
            companyCNPJ)
    }

}