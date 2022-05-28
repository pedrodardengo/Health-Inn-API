import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CompanyDTO} from "../dto/company.dto";
import {WorkRelation} from "./work-relation.entity";


@Entity({name: "Company"})
export class Company {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    cnpj: string

    @OneToMany(
        () => WorkRelation,
            workRelation => workRelation.company,
        {onDelete: "CASCADE"}
    )
    workRelations: WorkRelation[]

    build(companyDTO: CompanyDTO): Company {
        this.name = companyDTO.name
        this.cnpj = companyDTO.cnpj
        return this
    }
}