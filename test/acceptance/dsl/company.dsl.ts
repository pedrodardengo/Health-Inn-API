import {RestDriver} from "../drivers/rest.driver";
import {CompanyDTO} from "../../../src/company/dto/company.dto";
import {WorkRelationDTO} from "../../../src/company/dto/work-relation.dto";
import {EmployeeDTO} from "../../../src/employee/dto/employee.dto";
import {faker} from "@faker-js/faker";
import * as cnpjGenerator from "@fnando/cnpj"
import {WorkRelation} from "../../../src/company/entities/work-relation.entity";


export class CompanyDSL {

    private restDriver: RestDriver

    constructor(restDriver: RestDriver) {
        this.restDriver = restDriver
    }

    async registerCompany(companyDTO: CompanyDTO): Promise<void> {
        await this.restDriver.registerCompany(companyDTO)
    }

    generateRandomCompany(): CompanyDTO {
        return {
            name: faker.name.findName(),
            cnpj: cnpjGenerator.generate(),
        }
    }

    generateRandomWorkRelation(employee: EmployeeDTO, company: CompanyDTO, isActive: boolean): WorkRelationDTO {
        return {
            isActive,
            companyCNPJ: company.cnpj,
            employeeCPF: employee.cpf,
            position: faker.name.jobTitle(),
            sector: faker.name.jobType()
        }
    }

    async registerWorkRelation(workRelationDTO: WorkRelationDTO): Promise<void> {
        await this.restDriver.registerWorkRelation(workRelationDTO);
    }

    async retrieveWorkRelation(cnpj: string, cpf: string): Promise<WorkRelation> {
        return await this.restDriver.retrieveWorkRelation(cnpj, cpf);
    }

    assertWorkRelationMatch(workRelation: WorkRelation, workRelationDTO: WorkRelationDTO): void {
        expect(workRelation).toMatchObject(workRelationDTO)
    }
}