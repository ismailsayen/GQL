const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const port = 4500;
const typeDefs = require('./graphQL/typeDefs');
const resolvers = require('./graphQL/resolvers');
const app = express();
const cookieParser = require('cookie-parser');

// Configure Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers
});

// Configure CORS 
const corsOptions = {
    origin: ['http://localhost:5173', 'https://studio.apollographql.com'],
    credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/dashboard", require('./route/dashboard'));

// Authentication and login routes
app.use('/auth', require('./route/JwtAuth'));

// Start Apollo Server and apply middleware
async function startApolloServer() {
    await server.start();
    server.applyMiddleware({ app });
}

startApolloServer().then(() => {
    app.listen(port, () =>
        console.log(`🚀 GraphQL Server ready at http://localhost:${port}/graphql`)
    );
});
