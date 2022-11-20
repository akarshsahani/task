// Import required package from graphql
const { GraphQLSchema, GraphQLObjectType} = require("graphql");

// Import queries
const { users, user } = require('./queries.js');

// Import mutation
const { register, login, update, deleteUser } = require('./mutation')

// Define QueryType
const QueryType = new GraphQLObjectType({
    name : "QuerrType",
    description : "Queries",
    fields : { users, user },
})

// Define Mutation type
const MutationType = new GraphQLObjectType({
    name : "MutationType",
    description : "Mutations",
    fields : { register, login, update, deleteUser },
})

module.exports = new GraphQLSchema({
    query : QueryType,
    mutation : MutationType
})