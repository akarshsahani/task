const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {

    console.log("start token auth");
    const token = req.headers.Authorization?.split(" ")[1] || ""
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJuYW1lIjoidGVzdCIsImFnZSI6MjAsImdlbmRlciI6Im0iLCJhZGRyZXNzIjoiYm5nIiwiZW1haWwiOiJ0ZXN0NkB0ZXN0LmNvbSIsInBhc3N3b3JkIjoidGVzdCIsImNyZWF0ZWRBdCI6IjIwMjItMTEtMjBUMTM6MjI6MTMuMTE5WiIsInVwZGF0ZWRBdCI6IjIwMjItMTEtMjBUMTM6NDc6MzAuMDE3WiJ9LCJpYXQiOjE2Njg5NTIxOTksImV4cCI6MTY2ODk1NTc5OX0.95Eua4PkJd-ATmfgogaxTk3ISKIh4jJSBH2PcaWbfo4";

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY)
        req.verifiedUser = verified.user
        console.log(verified.user);
        console.log("Verification Successful in auth");
        req.authenticated = true;
        next();
    }catch(err){
        console.log("Verification failed");
        next();
    }
}

module.exports = { authenticate }