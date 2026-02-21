require ("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// Connect to MongoDB
const mongoose = require("mongoose");

async function Db_connection() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("DB Connected ");
    } catch (error) {
        console.log("Error connecting to DB:", error);  
    }
    
}
Db_connection();


///////////phase 1///////////

const User = require("./models/User");

const userRoutes=require("./Routes/userRoutes")

app.use('/api',userRoutes)




///////////phase 2///////////



const Product = require("./models/Product");

const produtRouter = require("./Routes/productRoutes");


app.use('/api/',produtRouter)










app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});