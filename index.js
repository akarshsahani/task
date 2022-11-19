const express = require("express");
const app = express();
const dotenv = require("dotenv");
const {graphqlHTTP} = require("express-graphql");
const schema = require("./src/graphql/schema.js")
const { createJwtToken } = require('./src/util/utilToken.js')
const { authenticate } = require("./src/middleware/auth")
dotenv.config();

app.use(authenticate)

app.get("/", (req, res) => {
    res.json({msg : "Welcome go to /graphql to continue."})
});

app.get("/authtest", (req, res) => {
    res.json(createJwtToken({
        email: "test@test.com", 
        gender: "m"
    }))
})

app.use('/graphql', graphqlHTTP({
    schema : schema,
    graphiql : true,
}));

app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT}.`);
});



// https://www.youtube.com/watch?v=iQrsckyou_8&ab_channel=KarthickRagavendran