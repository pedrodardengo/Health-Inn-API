import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Address} from "./adress.entity";
import {EmployeeDTO} from "../dto/employee.dto";
import {WorkRelation} from "../../company/entities/work-relation.entity";

@Entity({name: "Employee"})
export class Employee {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    cpf: string

    @Column({unique: true})
    rg: string

    @Column()
    name: string

    @Column({ type: 'date' })
    birthday: string

    @Column({ nullable: true })
    email: string

    @Column({ nullable: true })
    phoneNumber: string

    @OneToOne(() => Address, address => address.employee, {onDelete: "CASCADE"})
    @JoinColumn()
    address: Address

    @OneToMany(() => WorkRelation, workRelation => workRelation.employee, {onDelete: "CASCADE"})
    workRelations: WorkRelation[]

    build(employeeDTO: EmployeeDTO): Employee {
        this.cpf = employeeDTO.cpf
        this.rg = employeeDTO.rg
        this.name = employeeDTO.name
        this.birthday = employeeDTO.birthday
        this.email = employeeDTO.email
        this.phoneNumber = employeeDTO.phoneNumber
        this.address = new Address().build(employeeDTO.address)
        return this
    }
}