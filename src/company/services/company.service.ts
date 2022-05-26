import {Injectable} from "@nestjs/common";
import {CompanyRepository} from "../repositories/interface.repositories";
import {CompanyDTO} from "../dto/company.dto";
import {WorkRelationDTO} from "../dto/work-relation.dto";
import {EmployeeService} from "../../employee/services/employee.service";
import {WorkRelation} from "../entities/work-relation.entity";


@Injectable()
export class CompanyService {
    constructor(
        private companyRepo: CompanyRepository,
        private employeeService: EmployeeService,
        ) {}

    async registerCompany(companyDTO: CompanyDTO) {
        return await this.companyRepo.create(companyDTO);
    }

    async addWorkRelation(workRelationDTO: WorkRelationDTO): Promise<void> {
        const employee = await this.employeeService.getEmployeeByCPF(workRelationDTO.employeeCPF)
        const company = await this.companyRepo.getCompanyByCNPJ(workRelationDTO.companyCNPJ)
        const workRelation = new WorkRelation().build(employee, company, workRelationDTO)
        await this.companyRepo.createWorkRelation(workRelation)
    }
}