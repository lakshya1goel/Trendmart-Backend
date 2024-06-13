const jwt = require("jsonwebtoken");
const User = require("../models/User");

const admin = async (req, res, next) => {
    try{
        const token = req.header('x-auth-token');
        if(!token){
            return res.status(401).json({message: "No auth token, access denied!"});
        }
        const isVerified = jwt.verify(token, "mysecretKey");
        if(!isVerified){
            return res.status(401).json({message: "Token verification failed!"});
        }
        const user = await User.findById(isVerified.id);
        if(user.type != "admin"){
            return res.status(401).json({message: "Unauthorized!"});
        }
        req.user = isVerified.id;
        req.token = token;
        next();
    }
    catch(err){
        res.status(401).json({message: err.message || "Unauthorized!"});
    }
}

module.exports = admin;