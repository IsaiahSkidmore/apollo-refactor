import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schemas/index.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string;
  email: string;
}

const app: Application = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.split(' ')[1];
    const secretKey = process.env.JWT_SECRET_KEY || '';

    if (token) {
      try {
        const user = jwt.verify(token, secretKey) as JwtPayload;
        return { user };
      } catch (err) {
        console.error(err);
      }
    }
    return {};
  },
});


// server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);