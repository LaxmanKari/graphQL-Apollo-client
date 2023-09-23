const express = require("express");
const server = express();
const port = 6969;

//we are using static mock data,
//consider we are making an API call to the related service endpoint
const userData = require("./MOCK_DATA.json");

const {
  graphql,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require("graphql");
//not working
//const { graphqlHTTP } = require("graphql-http");

const { createHandler } = require ('graphql-http/lib/use/express');

//schema is combination between mutations and queries
//queries --> getting data
//mutations --> update/delete/create data
//Schema --> type definition
//ex: user schema can have name/id, etc..

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

// variable representing all queries is the root query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        //make api call to db in real time projects
        return userData;
      },
    },
    getUserById:{

    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        userData.push({
          id: userData.length + 1,
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          password: args.password,
        });
        return args; //it is like res.send()
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

// server.use(
//   "/graphql",
//   graphqlHTTP({
//     schema,
//     graphql: true, //enables graph ql interface, we can visually see
//   })
// );

server.all('/graphql', createHandler({ schema, graphiql: true }));

server.listen(port, () => {
  console.log("Server listening on", port);
});

console.log("hey");
