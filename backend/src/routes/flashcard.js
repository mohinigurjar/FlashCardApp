const express = require("express");
const flashcardRouter = express.Router();
const { validateFlashcardData } = require("../utils/validation");
const { userAuth } = require("../middlewares/auth");
const Card = require("../models/flashcard");

//creating a new instance of the flashcard model
flashcardRouter.post('/flashcard', userAuth, async(req, res) => {
    try{
        validateFlashcardData(req);
        const {question, answer, tags, bookmarked} = req.body;
        const flashcard = new Card({question, answer, tags, bookmarked});
        await flashcard.save();
        // console.log(newCard);
        res.send("New Flashcard added")
    }catch(error){
        res.status(400).send("ERROR : " + error.message);
    }
})

//get all flashcards
flashcardRouter.get('/flashcard', userAuth, async(req, res) => {
    try{
        const allCards = await Card.find({});
        res.send(allCards);
    }catch(error){
        res.status(404).send("Flashcards not found");
    }
})

//get one flashcard by id
flashcardRouter.get('/flashcard/:id', userAuth, async(req, res) => {
    try{
        const cardId = req.params.id;
        const card = await Card.findById(cardId);
        if(!card){
            throw new Error("Flashcard not found");
        }
        res.send(card);
    }
    catch(error){
        res.status(404).send("ERROR : " + error.message);
    }
})

//updating particular field (removed upsert to prevent creating new documents)
flashcardRouter.patch('/flashcard/:id', userAuth, async(req, res) => {
    try{
        const cardId = req.params.id;
        const { question, answer, tags, bookmarked } = req.body;
        
        // Validate that the card exists first
        const existingCard = await Card.findById(cardId);
        if(!existingCard){
            return res.status(404).send("Flashcard not found");
        }
        
        // Update only provided fields
        const updateData = {};
        if(question !== undefined) updateData.question = question;
        if(answer !== undefined) updateData.answer = answer;
        if(tags !== undefined) updateData.tags = tags;
        if(bookmarked !== undefined) updateData.bookmarked = bookmarked;

        const card = await Card.findByIdAndUpdate(cardId, updateData, { new: true });
        res.send({
            message: "Card updated successfully",
            card: card
        });
    }catch(err){
        res.status(400).send("Update failed: " + err.message);
    }
})

//delete card by id
flashcardRouter.delete('/flashcard/:id', userAuth, async(req, res) => {
    try{
        const deleteCardId = req.params.id;
        const card = await Card.findByIdAndDelete(deleteCardId);
        res.send("Card deleted successfully");

    }catch(error){
        res.status(404).send("card not found");

    }
})


module.exports = flashcardRouter;