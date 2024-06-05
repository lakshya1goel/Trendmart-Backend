const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try{
        const token = req.header('x-auth-token');
        if(!token){
            return res.status(401).json({message: "No auth token, access denied!"});
        }
        const isVerified = jwt.verify(token, "mysecretKey");
        if(!isVerified){
            return res.status(401).json({message: "Token verification failed!"});
        }
        req.user = isVerified.id;
        req.token = token;
        next();
    }
    catch(err){
        res.status(401).json({message: err.message || "Unauthorized!"});
    }
}

module.exports = auth;