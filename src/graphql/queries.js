const { GraphQLList, GraphQLObjectType } = require("graphql");
const { UserType } = require("./types");
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();
// const { } = require("../model/entity")


const users = {
    type: new GraphQLList(UserType),
    description: "Retrives list of users",
    resolve(parent, args) {
        try {
            const usr = prisma.user.findMany()
        } catch (error) {
            console.log(error);
        }finally{
            async () => {
                await prisma.$disconnect();
           }
        }
    },
}

const user = {
    type: UserType,
    description: "Retrives one user",
    resolve(parent, args) {
        try {
            const usr = prisma.user.findUnique({
                where: { email: args.email }
            })
        } catch (error) {
            console.log(error);
        }finally{
            async () => {
                await prisma.$disconnect();
           }
        }
    },
}

// const user =null;

module.exports = { users, user }