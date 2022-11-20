const { graphql, GraphQLString, GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLList } = require("graphql");
// import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();
const { createJwtToken } = require("../util/utilToken")
const { user, users, UserType} = require("./types");


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
            const token = createJwtToken(user)
            return token;
        }
    }
}

const update = {
    type: GraphQLString,
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

        // console.log("Verified User", verifiedUser);
        if(!verifiedUser){
            throw new Error("Unauthorized")
        }
        var userUpdated = {
            email : null,
            password : null,
            name: null,
            age: null,
            gender: null,
            address: null
        }

        if(args.email){
            userUpdated.email = args.email;
        }else{
            userUpdated.email = verifiedUser.email;
        }
        if(args.password){
            userUpdated.password = args.password;
        }else{
            userUpdated.password = verifiedUser.password;
        }
        if(args.name){
            userUpdated.name = args.name;
        }else{
            userUpdated.name = verifiedUser.name;
        }
        if(args.age){
            userUpdated.age = args.age;
        }else{
            userUpdated.age = verifiedUser.age;
        }
        if(args.gender){
            userUpdated.gender = args.gender;
        }else{
            userUpdated.gender = verifiedUser.gender;
        }
        if(args.address){
            userUpdated.address = args.address;
        }else{
            userUpdated.address = verifiedUser.address;
        }

        try {
            const res = await prisma.user.update({
                where : {
                    id : verifiedUser.id
                },
                data : {
                    email : userUpdated.email,
                    password : userUpdated.password,
                    name : userUpdated.name,
                    age : userUpdated.age,
                    gender : userUpdated.gender,
                    address : userUpdated.address,
                }
            })
            console.log(res);
            return "Updates Successfully";
        } catch (error) {
            console.log(error);
            return error;
        }finally{
            async () => {
                await prisma.$disconnect();
            }
        }
        
    }
}

const deleteUser = {
    type: GraphQLString,
    description: "delete user.",
    // args: {
    //     email: { type: GraphQLString },
    //     password: { type: GraphQLString },
    //     name: { type: GraphQLString },
    //     age: { type: GraphQLInt },
    //     gender: { type: GraphQLString },
    //     address: { type: GraphQLString },
    // },
    async resolve(parent, args, { verifiedUser }){

        if(!verifiedUser){
            throw new Error("Unauthorized")
        }
        
        try {
            const res = await prisma.user.delete({
                where : {
                    id : verifiedUser.id
                }
            })
            console.log(res);
            return "deleted Successfully";
        } catch (error) {
            console.log(error);
            return error;
        }finally{
            async () => {
                await prisma.$disconnect();
            }
        }
        
    }
}

module.exports = { register, login, update, deleteUser }