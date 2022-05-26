import {Column, Entity, OneToMany} from "typeorm";
import {Company} from "./company.entity";
import {Employee} from "../../employee/entities/employee.entity";
import {WorkRelationDTO} from "../dto/work-relation.dto";


@Entity({name: 'WorkRelation'})
export class WorkRelation {

    @OneToMany(() => Company, company => company.workRelations)
    company: Company

    @OneToMany(() => Employee, employee => employee.workRelations)
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