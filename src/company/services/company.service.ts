import {ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import {CompanyRepository} from "../repositories/interface.repositories";
import {CompanyDTO} from "../dto/company.dto";
import {WorkRelationDTO} from "../dto/work-relation.dto";
import {EmployeeService} from "../../employee/services/employee.service";
import {WorkRelation} from "../entities/work-relation.entity";
import {Company} from "../entities/company.entity";
import {COMPANY_MESSAGES} from "../../exceptions/messages.exceptions";


@Injectable()
export class CompanyService {
    constructor(
        private companyRepo: CompanyRepository,
        private employeeService: EmployeeService,
        ) {}

    async registerCompany(companyDTO: CompanyDTO) {
        const company = await this.companyRepo.create(companyDTO)
        if (!company) throw new ConflictException(COMPANY_MESSAGES.ALREADY_EXISTS(companyDTO.cnpj));
        return company;
    }

    async getCompanyByCNPJ(cnpj: string): Promise<Company> {
        const company = await this.companyRepo.getCompanyByCNPJ(cnpj)
        if (!company) throw new NotFoundException(COMPANY_MESSAGES.NOT_FOUND(cnpj))
        return company
    }

    async addWorkRelation(workRelationDTO: WorkRelationDTO): Promise<void> {
        const employee = await this.employeeService.getEmployeeByCPF(workRelationDTO.employeeCPF)
        const company = await this.getCompanyByCNPJ(workRelationDTO.companyCNPJ)
        const workRelation = new WorkRelation().build(employee, company, workRelationDTO)
        if (workRelationDTO.isActive) await this.companyRepo.inactivateAllWorkRelationsOfEmployee(employee)
        const savedWorkRelation = await this.companyRepo.createWorkRelation(workRelation)
        if (!savedWorkRelation) {
            throw new ConflictException(
                COMPANY_MESSAGES.WORK_RELATION_ALREADY_EXISTS(workRelationDTO.companyCNPJ, workRelationDTO.employeeCPF)
            )
        }
    }

    async getWorkRelation(employeeCPF: string, companyCNPJ: string): Promise<WorkRelationDTO> {
        const company = await this.getCompanyByCNPJ(companyCNPJ)
        const employee = await this.employeeService.getEmployeeByCPF(employeeCPF)
        const workRelation = await this.companyRepo.getWorkRelationByIds(employee.id, company.id)
        if (!workRelation) {
            throw new NotFoundException(COMPANY_MESSAGES.NOT_FOUND_WORK_RELATION(employeeCPF, companyCNPJ))
        }
        return { ...workRelation, companyCNPJ: company.cnpj, employeeCPF: employee.cpf }
    }
}