const express = require("express");
const connectDB = require("./config/database")
const app = express();

const User = require('./models/users');

app.use(express.json());


//creating a new instance of the user model
app.post('/signup', async(req, res) => {
    const user = new User(req.body)

    try{
    const saved = await user.save();
    res.send("User added successfully")
    }catch(error){
        res.status(400).send("Error sending request" + error.message);
    }

})

//fetching all users
app.get('/users', async(req, res) => {
    const users = await User.find({});
    try{
        res.send(users);
    }catch(error){
        res.status(404).send("Users not found");
    }
    
})

//delete by id
app.delete('/user', async(req, res) => {
    const deletedUser = await User.findByIdAndDelete("68a62f592051c0a070a53713");
    try{
        res.send(deletedUser);
    }catch(error){
        res.status(404).send("User not found");
    }
    
})

app.delete('/delete', async(req, res) => {
    const deletedUser = await User.findOneAndDelete({ name: "Stephen"})
    try{
        res.send(deletedUser)
    }catch(error){
        res.status(404).send("User not found");
    }
})


connectDB().then(() => {
    console.log("connection established");
    app.listen("5000", () => {
    console.log("App listening on port 5000");
})
})
.catch((error)=>{
    console.log("Error connecting to db")
});