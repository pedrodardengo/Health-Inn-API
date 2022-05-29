import {Test, TestingModule} from '@nestjs/testing'
import {INestApplication, ValidationPipe} from '@nestjs/common'
import * as supertestRequest from 'supertest'
import {AppModule} from '../../../src/app.module'

export class AppConn {
    public app: INestApplication
    public requester: supertestRequest.SuperTest<supertestRequest.Test>
    private readonly port: number

    constructor(port: number) {
        this.port = port
    }

    async init(): Promise<void> {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        this.app = moduleFixture.createNestApplication()
        this.app.useGlobalPipes(new ValidationPipe({transform: true}))
        await this.app.listen(this.port)
        this.requester = supertestRequest(this.app.getHttpServer())
    }

    async stop(): Promise<void> {
        await this.app.close()
    }
}