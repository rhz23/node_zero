import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";

const server = fastify()

const database = new DatabaseMemory;

server.post('/videos', (request, reply) => {
    const { title, description, duration } = request.body

    database.create({
        //title: title,  (bellow is a short syntax used in js)
        title,
        //description: description,
        description,
        //duration: duration,
        duration,    
    })

    return reply.status(201).send();
})

server.get('/videos', (request) => {
    const search = request.query.search;

    console.log(search)

    const videos = database.list(search);

    return videos;
})

server.put('/videos/:id', (request, reply) => {
    const videId = request.params.id;
    const { title, description, duration } = request.body

    database.update(videId,{
        title,
        description,
        duration,
    })

    return reply.status(204).send();
})

server.delete('/videos/:id', (request, reply) => {
    const videId = request.params.id;

    database.delete(videId);
    
    return reply.status(204).send();
})

server.listen({
    port: 3333,
})