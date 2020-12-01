import 'dotenv/config';
import { sign } from 'jsonwebtoken';
import { Lecturer } from '../entity/Lecturer';

export const createAccessToken = (lecturer: Lecturer) => {

    const { ACCESS_TOKEN } = process.env;

    return sign({ id: lecturer.id}, ACCESS_TOKEN!, {
        expiresIn: "5m"
    })
}

export const createRefreshToken = (lecturer: Lecturer) => {

    const { REFRESH_TOKEN } = process.env;

    return sign({ id: lecturer.id }, REFRESH_TOKEN!, {
        expiresIn: "7d"
    })
}