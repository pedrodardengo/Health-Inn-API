import {Body, Controller, Post} from "@nestjs/common";
import {CompanyDTO} from "../dto/company.dto";
import {CompanyService} from "../services/company.service";
import {WorkRelationDTO} from "../dto/work-relation.dto";


@Controller()
export class CompanyController {
    constructor(private companyService: CompanyService) {}

    @Post('/company')
    async registerCompany(@Body() company: CompanyDTO): Promise<void> {
        await this.companyService.registerCompany(company);
    }

    @Post('/work')
    async addWorkRelationBetweenCompanyAndEmployee(@Body() workRelationDTO: WorkRelationDTO): Promise<void> {
        await this.companyService.addWorkRelation(workRelationDTO)
    }
}