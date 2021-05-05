const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const { ApolloServer, gql } = require('apollo-server-express');

/** The Schema for our API */
const typeDefs = gql`
  type Query {
    hello: String
  }
`;
/** The resolver who responses the queries done against our API */
const resolver = {
    Query: {
      hello: () => 'Hello world!',
    },
};

const server = new ApolloServer({typeDefs,resolvers:resolver});
server.applyMiddleware({app, path: '/api'});
const port = process.env.PORT || 4321;

app.listen(port, () => {
    console.log(`GraphQL running at port ${port}${server.graphqlPath}`);
});