const express = require("express");
const adminRouter = express.Router();
const admin = require("../middlewares/admin");
const auth = require("../middlewares/auth");
const Product = require("../models/product");

adminRouter.post("/admin/addProduct", admin, async (req, res) => {
    try{
        const {name, description, images, quantity, price, category} = req.body;
        let product = new Product({
            name,
            description,
            images,
            quantity,
            price,
            category
        });
        product = await product.save();
        res.json(product);
    }
    catch(err){
        res.status(500).json({message: err.message || "Internal Server Error!"});
    }
});

adminRouter.get("/admin/getProducts", admin, async (req, res) => {
    try{
        const products = await Product.find();
        res.json(products);
    }
    catch(err){
        res.status(500).json({message: err.message || "Internal Server Error!"});
    }
});

adminRouter.get("/admin/getProductById/:id", auth, async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    }
    catch(err){
        res.status(500).json({message: err.message || "Internal Server Error!"});
    }
});

adminRouter.delete("/admin/deleteProduct/", admin, async (req, res) => {
    try{
        const {id} = req.body;
        let product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    }
    catch(err){
        res.status(500).json({message: err.message || "Internal Server Error!"});
    }
});

adminRouter.patch("/admin/updateProduct/", admin, async (req, res) => {
    try{
        const {id, name, description, images, quantity, price, category} = req.body;
        let product = await Product.findByIdAndUpdate(id, {name, description, images, quantity, price, category}, {new: true});
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    }
    catch(err){
        res.status(500).json({message: err.message || "Internal Server Error!"});
    }
});

module.exports = adminRouter;