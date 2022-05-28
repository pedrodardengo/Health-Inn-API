import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Employee} from "./employee.entity";
import {AddressDTO} from "../dto/address.dto";

@Entity({name: "Address"})
export class Address {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    country: string

    @Column()
    state: string

    @Column()
    city: string

    @Column()
    street: string

    @Column()
    number: string

    @Column({nullable: true})
    complement: string

    @Column()
    zipCode: string
    
    @OneToOne(
        () => Employee, employee => employee.address,
        {onDelete: "CASCADE"}
    )
    employee: Employee

    build(address: AddressDTO): Address {
        this.country = address.country
        this.state = address.state
        this.city = address.city
        this.street = address.street
        this.number = address.number
        this.complement = address.complement
        this.zipCode = address.zipCode
        return this
    }

}