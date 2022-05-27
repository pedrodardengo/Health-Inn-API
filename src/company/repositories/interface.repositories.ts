import {Company} from "../entities/company.entity";
import {CompanyDTO} from "../dto/company.dto";
import {WorkRelation} from "../entities/work-relation.entity";
import {Employee} from "../../employee/entities/employee.entity";

export abstract class CompanyRepository {
    abstract create(companyDTO: CompanyDTO): Promise<Company>

    abstract getCompanyByCNPJ(companyCNPJ: string): Promise<Company>

    abstract createWorkRelation(workRelation: WorkRelation): Promise<WorkRelation>

    abstract inactivateAllWorkRelationsOfEmployee(employee: Employee): Promise<void>

    abstract getWorkRelationByCPFAndCNPJ(employeeId: number, companyId: number): Promise<WorkRelation>
}