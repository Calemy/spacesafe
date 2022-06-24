const fastify = require('fastify')();
const qs = require('qs')
const { connect } = require('./helper/database');
const startup = require('./modules/startup')

async function main(){
    await startup()
    const { name, port } = require('./config')
    await connect()


    fastify.register(require("@fastify/multipart"));
    fastify.register(require('@fastify/formbody'), { parser: str => qs.parse(str) })

    fastify.get('/', async (req, reply) => {
        return name + ", a blazing fast Storage written in node!\n" +
        "For questions, please contact Lemres#0001 on Discord.\n" +
        "We're also planning on going open-source!"
    })

    fastify.get('/sharex', async (req, reply) => {
        return await require('./modules/sharex')(req, reply)
    })

    fastify.post('/api/register', async (req, reply) => {
        return await require('./modules/user').create(req, reply)
    })

    fastify.get('/auth', async (req, reply) => {
        return await require('./modules/user').auth(req, reply)
    })
    
    fastify.get('/:file', async (req, reply) => {
        return await require('./modules/get')(req, reply)
    })
    
    fastify.post('/api/upload', async (req, reply) => {
        return await require('./modules/upload')(req, reply)
    })
    
    fastify.listen({ port })
    console.log("Listening on 127.0.0.1:" + port)
}

main()