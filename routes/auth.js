const express = require("express");
const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();
const auth = require("../middlewares/auth.js");

authRouter.post("/api/signup", async (req, res) => {
    try {
        const { username, name, email, password, type } = req.body;

        const existingUserWithEmail = await User.findOne({email});
        if(existingUserWithEmail) {
            return res.status(400).json({message: "Email already exists!"});
        }
        const existingUserWithUsername = await User.findOne({username});
        if(existingUserWithUsername) {
            return res.status(400).json({message: "Username already exists!"});
        }

        const hashedPass = await bcryptjs.hash(password, 8)

        let user = new User({
            username,
            name,
            email,
            password: hashedPass,
            type
        });

        user = await user.save();
        res.json(user);
    } 
    catch (err) {
        res.status(500).json({message: err.message || "Internal server error!"});
    }
});

authRouter.post("/api/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: "Invalid email!"});
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: "Invalid password!"});
        }
        
        const token = jwt.sign({id: user._id}, "mysecretKey");
        res.json({token, ...user._doc});
    } 
    catch (err) {
        res.status(500).json({message: err.message || "Internal server error!"});
    }
});

authRouter.post("/verifyAccessToken", async (req, res) => {
    try {
        const token = req.header('x-auth-token');
        if(!token) return res.json(false);
        const isVerified = jwt.verify(token, "mysecretKey");  
        if(!isVerified) return res.json(false);
        const user = await User.findById(isVerified.id);
        if(!user) return res.json(false);
        res.json(true);
    }
    catch (err) {
        res.status(500).json({message: err.message || "Internal server error!"});
    }
});

authRouter.get("/getUserData", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({...user._doc, token: req.token});
});

module.exports = authRouter;