const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt} = require("graphql");

const UserType = new GraphQLObjectType({
    name: "user",
    description: "User type",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString},
        email: { type: GraphQLString},
        password: { type: GraphQLString},
        age: { type: GraphQLInt},
        address: { type: GraphQLString},
        gender: { type: GraphQLString},
        createdAt: { type: GraphQLString},
        updatedAt: { type: GraphQLString}
    })
})

module.exports = { UserType };