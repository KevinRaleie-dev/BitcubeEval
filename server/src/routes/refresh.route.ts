import 'dotenv/config';
import express, { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { createAccessToken } from '../auth/auth';
import { Lecturer } from '../entity/Lecturer';

const router = express.Router();

// post route for a refresh token

router.post('/', async (req: Request, res: Response) => {
	// bare minimum logic for now

	const token = req.cookies.rememberme;
	const {REFRESH_TOKEN} = process.env;
	let payload: any = null;

	if(!token) {
		return res.send({
			success: false,
			accessToken: ''
		});

	}
	
	try {
		payload = verify(token, REFRESH_TOKEN!);

	} catch (error) {
		return res.send({
			success: false,
			accessToken: ''
		});

	}

	// we got a valid token, send back access token
	const lecturer = await Lecturer.findOne({ id: payload.id });

	// if for some reason we dont have one
	if(!lecturer) {
		return res.send({
			success: false,
			accessToken: ''
		});

	}

	return res.send({
		success: true,
		accessToken: createAccessToken(lecturer)
	});

});


export default router;