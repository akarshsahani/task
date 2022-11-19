const jwt = require("jsonwebtoken");

const createJwtToken = (user) => {
    return jwt.sign({ user }, process.env.SECRET_KEY, {
        expiresIn: "1h",
    })
};

module.exports = { createJwtToken }