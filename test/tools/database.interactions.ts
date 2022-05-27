import {getConnection} from "typeorm";


export async function clearDB(): Promise<void> {
    const entities = getConnection().entityMetadatas;
    for (const entity of entities) {
        const repository = getConnection().getRepository(entity.name)
        await repository.clear()
    }
}