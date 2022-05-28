import {RestDriver} from "../drivers/rest.driver";
import {CompanyDTO} from "../../../src/company/dto/company.dto";
import {WorkRelationDTO} from "../../../src/company/dto/work-relation.dto";
import {WorkRelation} from "../../../src/company/entities/work-relation.entity";
import {EmployeeExampleBuilder} from "../../tools/employee-example-builder";
import {generateRandomCompanyExample, generateWorkRelationExample} from "../../tools/example-factory";


type GivenWorkRelation = {
    isActive: boolean,
    registered: boolean,
    forEmployee: string | 'new',
}

export class CompanyDSL {

    private restDriver: RestDriver

    constructor(restDriver: RestDriver) {
        this.restDriver = restDriver
    }

    async registerCompany(companyDTO: CompanyDTO): Promise<void> {
        await this.restDriver.registerCompany(companyDTO)
    }

    generateRandomCompany(): CompanyDTO {
        return generateRandomCompanyExample()
    }

    generateRandomWorkRelation(employeeCPF: string, companyCNPJ: string, isActive: boolean): WorkRelationDTO {
        return generateWorkRelationExample(employeeCPF, companyCNPJ, isActive)
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

    async givenCompany(): Promise<CompanyDTO> {
        const company = this.generateRandomCompany()
        await this.registerCompany(company)
        return company
    }

    async givenWorkRelation(
        config: GivenWorkRelation = {isActive: true, registered: true, forEmployee: 'new'}
    ): Promise<WorkRelationDTO> {
        const company = await this.givenCompany()
        let cpf: string
        if (config.forEmployee == 'new') {
            const employee = new EmployeeExampleBuilder().employee
            await this.restDriver.registerEmployee(employee)
            cpf = employee.cpf
        }
        else {
            cpf = config.forEmployee
        }
        const workRelation = this.generateRandomWorkRelation(cpf, company.cnpj, config.isActive)
        if (config.registered) await this.registerWorkRelation(workRelation)
        return workRelation
    }

    async assertStatusOfWorkRelation(companyCNPJ: string, employeeCPF: string, shouldBeActive: boolean): Promise<void> {
        const workRelation = await this.restDriver.retrieveWorkRelation(companyCNPJ, employeeCPF)
        expect(workRelation.isActive).toBe(shouldBeActive)
    }
}