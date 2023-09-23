const express = require("express");
const server = express();
const port = 1234; 

//we are using static mock data, 
//consider we are making an API call to the related service endpoint
const userData = require("./MOCK_DATA.json");

const {graphql, GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString} = require("graphql");
const {graphqlHTTP} = require("graphql-http");

//schema is combination between mutations and queries
//queries --> getting data
//mutations --> update/delete/create data
//Schema --> type definition
//ex: user schema can have name/id, etc..

// variable representing all queries is the root query
const RootQuery = new GraphQLObjectType({
   name: "RootQueryType",
   fields: {
      
   }
});

const Mutation = "mutation"

const schema = new graphql.GraphQLSchema({query:RootQuery, mutation:Mutation})

app.use('/graphql', graphqlHTTP({
   schema,
   graphql:true //enables graph ql interface, we can visually see
}))

server.listen(port, ()=>{
   console.log("Server listening on", port)
});

console.log("hey")