import {EmployeeRepository} from "./interface.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Employee} from "../entities/employee.entity";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {EmployeeDTO} from "../dto/employee.dto";
import {Address} from "../entities/adress.entity";
import {UpdateEmployeeDTO} from "../dto/update-employee.dto";


@Injectable()
export class EmployeeRepositoryImpl implements EmployeeRepository {

    constructor(
        @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
        @InjectRepository(Address) private addressRepo: Repository<Address>
    ) {}

    async create(registerEmployeeDTO: EmployeeDTO): Promise<Employee> {
        const employee = new Employee().build(registerEmployeeDTO)
        await this.addressRepo.save(employee.address)
        return await this.employeeRepo.save(employee)
    }

    async getByCPF(cpf: string): Promise<Employee> {
        return await this.employeeRepo.findOne({where: {cpf}})
    }

    async deleteByCPF(cpf: string): Promise<void> {
        const employee = await this.employeeRepo.findOne({where: {cpf}})
        await this.addressRepo.delete({id: employee.address.id})
        await this.employeeRepo.delete({cpf})
    }

    async update(cpf: string, updateEmployeeDTO: UpdateEmployeeDTO): Promise<void> {
        const employee = await this.employeeRepo.findOne({where: {cpf}})
        const updateEmployeeEntity = await this.employeeRepo.preload({id: employee.id, ...updateEmployeeDTO})
        await this.employeeRepo.save(updateEmployeeEntity)
    }
}