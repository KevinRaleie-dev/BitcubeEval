import 'dotenv/config';
import { AppContext } from '../utils/context';
import { MiddlewareFn } from 'type-graphql';
import { verify } from 'jsonwebtoken';

export const isAuth: MiddlewareFn<AppContext> = ({ context }, next) => {
	
	const auth = context.req.headers['authorization'];

	if(!auth) {
		throw new Error('Not authenticated');
	}

	try {
		const token = auth.split(' ')[1]; 

		const payload = verify(token, process.env.ACCESS_TOKEN!);
		context.payload = payload as any;
	} catch (error) {
		console.log(error.message);
		throw new Error('Not authenticated');
	}

	return next();
}