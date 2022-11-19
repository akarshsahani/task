const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {

    console.log("start token auth");
    // const token = req.headers.Authorization?.split(" ")[1] || ""
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1lIjoiZGV2IiwiYWdlIjoyMCwiZ2VuZGVyIjoibSIsImFkZHJlc3MiOiJibmciLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJwYXNzd29yZCI6InRlc3QiLCJjcmVhdGVkQXQiOiIyMDIyLTExLTE5VDEyOjU3OjQzLjg2MFoiLCJ1cGRhdGVkQXQiOiIyMDIyLTExLTE5VDEyOjU3OjQzLjg2MFoifSwiaWF0IjoxNjY4ODc4NDE0LCJleHAiOjE2Njg4ODIwMTR9.3BkL__aAb-SMwlTBBhB88mAbv2eMSTCGO0tItrIqeHQ";

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY)
        req.email = verified
        // console.log(verified);
        console.log("Verification Successful");
        next()
    }catch(err){
        console.log("Verification failed");
        next();
    }
}

module.exports = { authenticate }