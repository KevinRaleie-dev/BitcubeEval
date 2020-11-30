import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { connection } from './db/connection';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello'

const app = express();
const { PORT } = process.env;

const main = async () => {

    connection();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
                HelloResolver
            ],
            validate: false
        }),
    });

    apolloServer.applyMiddleware({app});

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}${apolloServer.graphqlPath}`);
    });

}

main();