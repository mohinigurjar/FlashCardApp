const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
    question: {
        type: String,
    },
    answer: {
        type: String,
    },
    bookmarked: {
        type: Boolean,
    },
    tags: {
        type: Array,
    }
})

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;