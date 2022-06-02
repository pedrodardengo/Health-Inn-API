import {TypeOrmModule} from "@nestjs/typeorm";
import {Employee} from "./employee/entities/employee.entity";
import {Address} from "./employee/entities/adress.entity";
import {Company} from "./company/entities/company.entity";
import {WorkRelation} from "./company/entities/work-relation.entity";
import {DynamicModule} from "@nestjs/common";
import {EntityClassOrSchema} from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";



const ENTITIES = [Employee, Address, Company, WorkRelation]

const devDBModule = TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    entities: ENTITIES,
    synchronize: true,
    logging: true,
})

const prodDBModule = TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: ENTITIES,
    synchronize: false,
    logging: false,
})

export function provideDBModuleForRoot(): DynamicModule {

    if (process.env.NODE_ENV === 'production') {
        return prodDBModule
    }
    return devDBModule
}

export function provideDBModuleForFeature(entities: EntityClassOrSchema[]): DynamicModule {
    return TypeOrmModule.forFeature(entities)
}