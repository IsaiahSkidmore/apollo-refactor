import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './schemas/resolvers';
import { typeDefs } from './schemas/index';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.split(' ')[1];
        const secretKey = process.env.JWT_SECRET_KEY || '';
        if (token) {
            try {
                const user = jwt.verify(token, secretKey);
                return { user };
            }
            catch (err) {
                console.error(err);
            }
        }
        return {};
    },
});
// server.applyMiddleware({ app });
app.listen({ port: 4000 }, () => console.log(`Server ready at http://localhost:4000${server.graphqlPath}`));
