import express from 'express';
import { ApolloServer } from '@apollo/server';
import path from 'path';
import { fileURLToPath } from 'url';
// import expressMidlleware from '@apollo/server-express';
import { typeDefs, resolvers } from './schemas/index.js';
import db from './config/connection.js';
const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const startApolloServer = async () => {
    await server.start();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    // app.use('/graphql', expressMiddleware(server));
    // if we're in production, serve client/dist as static assets
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/dist')));
        app.get('*', (_req, res) => {
            res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        });
    }
    console.log('Checking dist folder:', path.join(__dirname, '../client/dist'));
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
};
startApolloServer();
