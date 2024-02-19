const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const port = 4500;
const typeDefs = require('./graphQL/typeDefs');
const resolvers = require('./graphQL/resolvers');

const app = express();

// Configure Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers
});

// Middleware
app.use(cors());
app.use(express.json());

// Start Apollo Server and apply middleware
async function startApolloServer() {
    await server.start();
    server.applyMiddleware({ app });
}

startApolloServer().then(() => {
    app.listen(port, () =>
        console.log(`🚀 Serveur GraphQL prêt à l'adresse http://localhost:${port}/graphql`)
    );
});
