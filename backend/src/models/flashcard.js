const mongoose = require("mongoose");
// const tagSchema = mongoose.Schema({name: String});
const cardSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    bookmarked: {
        type: Boolean,
    },
    tags: {
        type: [String],
        required: true,
        default: "important",
    },
    
}, 
{
        timestamps: true,
    })

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;