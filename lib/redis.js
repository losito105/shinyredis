import {Client, Schema, Entity, Repository} from 'redis-om';

const client = new Client();

async function connect() {
    if(!client.isOpen()) {
        await client.open(process.env.REDIS_URL);
    }
}

class Mon extends Entity {}
let schema = new Schema(Mon, 
    {
        name: {type: 'string'},
        url: {type: 'string'},
        shinyUrl: {type: 'string'},
    },
    {
        dataStructure: 'JSON',
    }
);

export async function createMon(data) {
    await connect();

    const repository = new Repository(schema, client);

    const mon = repository.createEntity(JSON.parse(data));

    const id = await repository.save(mon);
    
    return id;
}