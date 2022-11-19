const { graphql, GraphQLString, GraphQLID, GraphQLInt } = require("graphql");
// import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();
const { createJwtToken } = require("../util/utilToken")
const { user, users} = require("./types");


const register = {
    type: GraphQLString,
    description: "Register user.",
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        gender: { type: GraphQLString },
        address: { type: GraphQLString }
    },
    async resolve(parent, args){
        const { email, password, name, age, gender, address } = args

        // const usr = {email, password, name, age, gender, address};
        var token = null;
        var usr = null;
        try {
            await prisma.user.create({
                data: {email, password, name, age, gender, address},
                // skipDuplicates : true
            })

            usr = await prisma.user.findUnique(
                {
                    where : {
                        email : args.email
                    }
                }
            )
            console.log(usr);
        } catch (error) {
            console.log(error);
        }finally{
            async () => {
                await prisma.$disconnect();
           }
        }

        if(usr != null){
            token = createJwtToken(usr);
        }
        if(token){
            return token;
        }else{
            return "something went wrong."
        }
    }
}

const login = {
    type: GraphQLString,
    description: "Login user",
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString},
    },
    async resolve(parent, args){
        const user = await prisma.user.findUnique({
            where: { email : args.email}
        })

        if(!user || args.password !== user.password) {
            throw new Error ("Invalid credentials")
        }else {
            const token  = createJwtToken(user)
            return token;
        }
    }
}

const update = {
    type: user,
    description: "Update user details.",
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        gender: { type: GraphQLString },
        address: { type: GraphQLString },
    },
    async resolve(parent, args, { verifiedUser }){

        console.log("Verified User", verifiedUser);
        if(!verifiedUser){
            throw new Error("Unauthorized")
        }
        const usr = verifiedUser.email
        console.log(usr);
        return usr;
    }
}

module.exports = { register, login, update }