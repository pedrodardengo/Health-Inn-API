import {faker} from '@faker-js/faker'
import * as cnpjGenerator from '@fnando/cnpj'
import {CompanyDTO} from '../../src/company/dto/company.dto'
import {WorkRelationDTO} from '../../src/company/dto/work-relation.dto'

export function generateRandomCompanyExample(): CompanyDTO {
    return {
        name: faker.company.companyName(),
        cnpj: cnpjGenerator.generate(),
    }
}

export function generateWorkRelationExample(
    employeeCPF: string,
    companyCNPJ: string, isActive: boolean,
): WorkRelationDTO {
    return {
        isActive,
        companyCNPJ,
        employeeCPF,
        position: faker.name.jobTitle(),
        sector: faker.name.jobType(),
    }
}