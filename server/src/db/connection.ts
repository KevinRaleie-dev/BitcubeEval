import 'dotenv/config';
import { Course } from '../entity/Course';
import { Degree } from '../entity/Degree';
import { Lecturer } from '../entity/Lecturer';
import { Student } from '../entity/Student';
import { createConnection } from "typeorm";

export const connection = async () => {

    try {
        await createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            database: process.env.DB_NAME,
            entities: [
                Student,
                Lecturer,
                Degree,
                Course
            ],
            synchronize: true,
            logging: true,
        })

    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}