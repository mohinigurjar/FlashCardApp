const express = require("express");
const connectDB = require("./config/database")
const app = express();

const User = require('./models/users');
const Card = require('./models/flashcard');

app.use(express.json());

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

//updating particular field
app.patch('/flashcard', async(req, res) => {
    const cardId = req.body.cardId;
    const data = req.body;
    try{     
        const card = await Card.findByIdAndUpdate({_id : cardId}, data);
        res.send("card updated successfully");
        // console.log(card);
    }catch(err){
        res.status(400).send("Updation failed" + err.message);
    }
})

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
