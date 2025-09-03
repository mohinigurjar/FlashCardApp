const express = require("express");
const connectDB = require("./config/database")
const validator = require("validator");
const cookieParser = require("cookie-parser");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { validateSignUpData } = require("./utils/validation")
const app = express();

const User = require('./models/users');
const Card = require('./models/flashcard');

app.use(express.json());
app.use(cookieParser())

app.post('/signup', async(req, res) => {
    // const user = new User(req.body); //bad practice to take the data as input instead take particular fields
  
    try{
        validateSignUpData(req);
        const {name, email, password} = req.body;
        //encrypt password
        const hashPassword = await bcrypt.hash(password, 10);
        console.log(hashPassword);
        const user = new User({name, email, password: hashPassword});
        await user.save();
        // console.log("hii");
        res.send("User added successfully")
    }catch(error){
        res.status(400).send("ERROR : " + error.message);
    }
})

app.post('/login', async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        //cannot store the og passwords to the database so we have to encrypt that using bcrypt
        if(!user){ //checking if the user with the current email exists in the database or not
            throw new Error("Invalid credentials");
        }

        // //password is compared here
        const isPasswordValid = await bcrypt.compare(password, user.password)
        
        if(isPasswordValid){
            
            // const token = 'jyfjytdtdrfjhgkjgkikuyddgjhggkjhk';

            //create jwt token
            const token = jwt.sign({_id: user._id}, "SECRETKEY**234", {expiresIn : "1h"});
            // console.log(token);
            res.cookie('token', token); 
            res.send("Login successfully!!");
        }
        else{
            throw new Error("Invalid Credentials");
        }
        

    }catch(error){
        res.status(400).send("ERROR : " + error.message);
    }
})

app.delete('/users', async(req, res) => {
    const users = User.find({name: "Mohini"});

    try{
        const del = await User.deleteMany(users);
        res.send("deleted users");

    }catch(err){
        res.status(500).send("Something went wrong")

    }

})

app.get('/profile', async(req, res) => {
    try{

        //reading cookies
        const cookies = req.cookies;
        //validation logic

        //getting token from the cookie
        const {token} = cookies; 
        if(!token){
            throw new Error("Invalid token");
        }
         
        //verifies the token and decodes payload 
        const decodedmsg = await jwt.verify(token, "SECRETKEY**234");
        console.log(decodedmsg); 
 
        //destructuring used to get the id of the user
        const { _id } = decodedmsg;

        const user = await User.findById(_id);
        if(!user){
            throw new Error("User not found");
        }
        res.send(user);

        
        // console.log(cookies); //gives back the cookie
        // res.send("Reading cookie");
    }catch(error) {
        res.status(400).send("ERROR : " + error.message);

    }
  
})
//creating a new instance of the flashcard model
app.post('/flashcard', async(req, res) => {
    const flashcard = new Card(req.body);

    try{
        const newCard = await flashcard.save();
        console.log(newCard);
        res.send("New Flashcard added")
    }catch(error){
        res.status(500).send("Something went wrong");
    }
})

//get all flashcards
app.get('/flashcard', async(req, res) => {
    try{
        const allCards = await Card.find({});
        res.send(allCards);
    }catch{
        res.status(404).send("Flashcards not found");
    }
})

//delete card by id
app.delete('/flashcard', async(req, res) => {
    try{
        const deleteCardId = req.body.deleteCardId;
        const card = await Card.findByIdAndDelete(deleteCardId);
        res.send("Card deleted successfully");

    }catch(error){
        res.status(404).send("card not found");

    }
})

//updating particular field or add if not already exists
app.patch('/flashcard', async(req, res) => {
    const cardId = req.body.cardId;
    const data = req.body;
    try{     
        const card = await Card.findByIdAndUpdate({_id : cardId}, data, {upsert: true});
        res.send("card updated successfully");
        // console.log(card);
    }catch(err){
        res.status(400).send("Updation failed" + err.message);
    }
})



//creating a new instance of the user model


connectDB().then(() => {
    console.log("connection established");
    app.listen("5000", () => {
    console.log("App listening on port 5000");
})
})
.catch((error)=>{
    console.log("Error connecting to db")
});

// app.delete('/delete', async(req, res) => {
//     const deletedUser = await User.findOneAndDelete({ name: "Stephen"})
//     try{
//         res.send(deletedUser)
//     }catch(error){
//         res.status(404).send("User not found");
//     }
// })
