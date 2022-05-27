import {Injectable} from "@nestjs/common";
import {CompanyRepository} from "./interface.repositories";
import {CompanyDTO} from "../dto/company.dto";
import {Company} from "../entities/company.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {WorkRelation} from "../entities/work-relation.entity";
import {Employee} from "../../employee/entities/employee.entity";


@Injectable()
export class CompanyRepositoryImpl implements CompanyRepository {
    constructor(
        @InjectRepository(Company) private companyRepo: Repository<Company>,
        @InjectRepository(WorkRelation) private workRelationRepo: Repository<WorkRelation>
    ) {}

    async create(companyDTO: CompanyDTO): Promise<Company> {
        const company = new Company().build(companyDTO)
        return await this.companyRepo.save(company)
    }

    async getCompanyByCNPJ(cnpj: string): Promise<Company> {
        return await this.companyRepo.findOne({where: {cnpj}})
    }

    async createWorkRelation(workRelation: WorkRelation): Promise<WorkRelation> {
        return await this.workRelationRepo.save(workRelation)
    }

    async inactivateAllWorkRelationsOfEmployee(employee: Employee): Promise<void> {
        await this.workRelationRepo.update({employeeId: employee.id}, {isActive: false})
    }

    async getWorkRelationByCPFAndCNPJ(employeeId: number, companyId: number): Promise<WorkRelation> {
        return await this.workRelationRepo.findOne({where: {employeeId, companyId}})
    }
}
