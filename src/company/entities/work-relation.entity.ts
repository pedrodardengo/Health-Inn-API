import {Column, Entity, ManyToOne, PrimaryColumn, RelationId} from "typeorm";
import {Company} from "./company.entity";
import {Employee} from "../../employee/entities/employee.entity";
import {WorkRelationDTO} from "../dto/work-relation.dto";


@Entity({name: 'WorkRelation'})
export class WorkRelation {

    @RelationId((workRelation: WorkRelation) => workRelation.company)
    @PrimaryColumn()
    companyId: number;

    @ManyToOne(() => Company, company => company.workRelations, {onDelete: "CASCADE"})
    company: Company

    @RelationId((workRelation: WorkRelation) => workRelation.employee)
    @PrimaryColumn()
    employeeId: number;

    @ManyToOne(() => Employee, employee => employee.workRelations, {onDelete: "CASCADE"})
    employee: Employee

    @Column()
    isActive: boolean

    @Column()
    sector: string

    @Column()
    position: string

    build(employee: Employee, company: Company, workRelationDTO: WorkRelationDTO) {
        this.employee = employee
        this.company = company
        this.isActive = workRelationDTO.isActive
        this.sector = workRelationDTO.sector
        this.position = workRelationDTO.position
        return this
    }
}