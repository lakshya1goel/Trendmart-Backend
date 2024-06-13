const express = require("express");
const adminRouter = express.Router();
const admin = require("../middlewares/admin");
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

module.exports = adminRouter;