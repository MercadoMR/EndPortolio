const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const { ApolloServer, gql } = require('apollo-server-express');


const comments=[ {id: '1', content: 'Muy buen post, me agrado', author: 'Marts'} ,
                {id: '2', content: 'Malo, no me gusto', author: 'Okidoki'}
]

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
const resolver = {
  Query: {
      saludo: () => 'Hello world!',
      comments: () => comments,
      comment: (parent, args) =>{
         return comments.find( comment => comment.id === args.id)
      }
    },
  Mutation: {
    newComment: (parent, args) => {
      let commentData ={
        id: String(comments.length + 1),
        content: args.content,
        author: 'Mimirs'
      };
      comments.push(commentData);
      return commentData;
    }
  }
};

const server = new ApolloServer({typeDefs,resolvers:resolver});
server.applyMiddleware({app, path: '/api'});
const port = process.env.PORT || 4321;

app.listen(port, () => {
    console.log(`GraphQL running at port ${port}${server.graphqlPath}`);
});