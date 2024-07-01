const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const productRouter = require("./routes/product");

const app = express();
const PORT = 3000;
const DB = "mongodb+srv://lakshya1234goel:Lak1234@cluster0.htduvqk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);

mongoose.connect(DB).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
