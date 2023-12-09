import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";

const server = fastify()

const database = new DatabaseMemory;

server.post('/videos', (request, reply) => {
    database.create({
        title: "video01",
        description: "Esse é o video 01",
        duration: 180,    
    })

    console.log(database.list());

    return reply.status(201).send();
})

server.get('/videos', () => {
    return 'Hello Rockseat!'
})

server.put('/videos/:id', () => {
    return 'Hello Node.js!'
})

server.delete('/videos/:id', () => {
    return 'Hello Node.js!'
})

server.listen({
    port: 3333,
})