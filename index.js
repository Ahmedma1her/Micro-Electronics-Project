require ("dotenv").config();
const express = require("express");
const bcrypt=require("bcrypt")
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

const User = require("./models/User");

app.post('/api/register', async (req, res) =>{
    try {
        //get data
        const { username, email, password , role} = req.body;
        // validate data
        if(!username|| !email || !password) return res.status(400).json({msg:"missing data"});

        const existUser= await User.findOne({email});
        if(existUser)return res.status(400).json({msg:"email is already used"})
        // create user
const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            username,
            email,
            password: hashPassword,
            role
        })
        res.status(201).json({
            msg:"user created",
            data: user})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"server error"})
        
    }
}  
)

app.post('/api/login', async (req, res) =>{
    try {
        //get data
        const { email, password } = req.body;
        if(!email || !password) return res.status(400).json({msg:"missing data"});
        // validate data
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({msg:"invalid email or password"});

        const userExist = await bcrypt.compare(password, user.password);
        
        if(!userExist) return res.status(400).json({msg:"invalid email or password"});
        // if all went well ,, then login
        const authcode= Buffer.from(user._id.toString()).toString('base64');

        res.status(200).json({msg:"login successful", authcode})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"server error"})
    }
})




















app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});