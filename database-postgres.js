import {randomUUID} from "node:crypto"
import { sql } from './db.js'


export class DatabasePostgres {

    //READ
    async list(search) {
        let videos;

        if (search) {
            videos = await sql`select * from videos where title ilike ${'%' + search + '%'}`;
        }
        else {
            videos = await sql`select * from videos`;
        }
        return videos;
    }

    //CREATE
    async create(video) {
        const videoId = randomUUID();
        const { title, description, duration } = video;

        await sql`insert into videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`;

    }

    //UPDATE
    async update(id, video) {
        const { title, description, duration } = video;

        await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} where id = ${id}`;

    }

    //DELETE
    async delete(id) {
        await sql`delete from videos where id = ${id}`;
    }

}