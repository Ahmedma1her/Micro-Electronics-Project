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




























app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});