const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const { validateSignUpData  } = require("../utils/validation");
const User = require("../models/users");


authRouter.post('/signup', async(req, res) => {
    // const user = new User(req.body); //bad practice to take the data as input instead take particular fields
  
    try{
        validateSignUpData(req);
        const {name, email, password} = req.body;
        //encrypt password 
        //the operation we have to perform on all users--can convert it into a method in schema
        const hashPassword = await bcrypt.hash(password, 10);
        // console.log(hashPassword);
        const user = new User({name, email, password: hashPassword});
        await user.save();
        // console.log("hii");
        res.send("User added successfully")
    }catch(error){
        res.status(400).send("ERROR : " + error.message);
    }
})

authRouter.post('/login', async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        
        //cannot store the og passwords to the database so we have to encrypt that using bcrypt
        if(!user){ //checking if the user with the current email exists in the database or not
            throw new Error("Invalid credentials");
        }

        // //password is compared here ---for every user so we can make a method in schema for the same
        const isPasswordValid = await user.validatePassword(password);
        
        if(isPasswordValid){
            
            // const token = 'jyfjytdtdrfjhgkjgkikuyddgjhggkjhk';

            //create jwt token
            //every user has its own unique token - create a method in schema to generate token
            const token = await user.getJWT();
            // console.log(token);
            //storing token in cookie which expires in 7 days
            res.cookie('token', token, {expires : new Date(Date.now() + 7 * 86400000)}); 
            res.send("Login successfully!!");
        }
        else{
            throw new Error("Invalid Credentials");
        }
        

    }catch(error){
        res.status(400).send("ERROR : " + error.message);
    }
})

authRouter.post('/logout', async(req, res) => {
    res.clearCookie('token');
    res.send("Logout successfully!!");
})

module.exports = authRouter;