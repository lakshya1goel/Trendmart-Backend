const express = require("express");
const productRouter = express.Router();
const Product = require("../models/product");
const auth = require("../middlewares/auth");

productRouter.get("/api/getProducts/", auth, async (req, res) => {
    try{
        const products = await Product.find();
        res.json(products);
    }
    catch(err){
        res.status(500).json({message: err.message || "Internal Server Error!"});
    }
});

productRouter.get("/api/getProductsByCategory/", auth, async (req, res) => {
    try{
        const products = await Product.find({category: req.query.category});
        res.json(products);
    }
    catch(err){
        res.status(500).json({message: err.message || "Internal Server Error!"});
    }
});

productRouter.get("/api/getProducts/search/:name", auth, async (req, res) => {
    try{
        const products = await Product.find({name: { $regex: req.params.name, $options: "i" }});
        res.json(products);
    }
    catch(err){
        res.status(500).json({message: err.message || "Internal Server Error!"});
    }
});

module.exports = productRouter;