import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import refreshToken from './routes/refresh.route';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connection } from './db/connection';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello'
import { LecturerResolver } from './resolvers/lecturer';
import { StudentResolver } from './resolvers/student';
import { DegreeResolver } from './resolvers/degree';
import { CourseResolver } from './resolvers/course';
import { MeResolver } from "./resolvers/me";

const app = express();
const { PORT, CLIENT_URL } = process.env;

const main = async () => {

	app.use(cors({
		origin: CLIENT_URL,
		credentials: true
	}));
	connection();
	app.use(cookieParser());
	app.use('/refresh_token', refreshToken);

	const apolloServer = new ApolloServer({
			schema: await buildSchema({
					resolvers: [
						HelloResolver,
						LecturerResolver,
						StudentResolver,
						DegreeResolver,
						CourseResolver,
						MeResolver
					],
					validate: false,
			}),
			context: ({ req, res }) => ({ req, res })
	});

	apolloServer.applyMiddleware({ app, cors: false });

	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}${apolloServer.graphqlPath}`);
	});

}

main();