const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const { ApolloServer, gql } = require('apollo-server-express');


const db = require('./db');
const DB_HOST = process.env.DB_HOST;

const models = require('./models')

/** The Schema for our API */
const typeDefs = gql`
  type Query{
    saludo: String!
    comments: [Comment!]!
    comment(id: ID!): Comment!
  }
  type Mutation{
    newComment(content: String!): Comment!
  }
  type Comment{
    id: ID!
    content: String!
    author: String
  }
`;

/** The resolver who responses the queries done against our API */
const resolvers = {
  Query: {
      saludo: () => 'Hello world!',
      comments: async () => { return await models.Comment.find() },
      comment: async (parent, args) =>{
         return await models.Comment.findById(args.id)
      }
    },
  Mutation: {
    newComment: async (parent, args) => {
      return await models.Comment.create({
          content: args.content,
          author: 'Mimirxd'
      })
    }
  }

};

const app = express();
const port = process.env.PORT || 4321;

db.connect(DB_HOST)

const server = new ApolloServer({typeDefs,resolvers});
server.applyMiddleware({app, path: '/api'});


app.listen(port, () => {
    console.log(`GraphQL running at port ${port}${server.graphqlPath}`);
});