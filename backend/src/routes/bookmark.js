const express = require("express");
const bookmarkRouter = express.Router();
const Card = require("../models/flashcard");
const { userAuth } = require("../middlewares/auth");

//get all bookmarked flashcards 
bookmarkRouter.get('/flashcard/bookmarked', userAuth, async(req, res) => {
    try{
        const bookmarkedCards = await Card.find({bookmarked: true});
        res.send(bookmarkedCards);
    }
    catch(error){
        res.status(404).send("ERROR : " + error.message);
    }
})

//get bookmark status for a flashcard
bookmarkRouter.get('/flashcard/:id/bookmark', userAuth, async(req, res) => {
    try{
        const cardId = req.params.id;
        const card = await Card.findById(cardId);
        
        if(!card){
            return res.status(404).send("Flashcard not found");
        }  
        res.send({
            cardId: cardId,
            bookmarked: card.bookmarked
        });
    }catch(err){
        res.status(400).send("Failed to get bookmark status: " + err.message);
    }
})

//toggle bookmark status for a flashcard
bookmarkRouter.patch('/flashcard/:id/bookmark', userAuth, async(req, res) => {
    try{
        const cardId = req.params.id;
        const card = await Card.findById(cardId);
        
        if(!card){
            return res.status(404).send("Flashcard not found");
        }
        
        // Toggle bookmark status
        card.bookmarked = !card.bookmarked;
        await card.save();
        
        res.send({
            message: "Bookmark status updated",
            bookmarked: card.bookmarked
        });
    }catch(err){
        res.status(400).send("Failed to update bookmark: " + err.message);
    }
})

module.exports = bookmarkRouter;