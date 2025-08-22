const mongoose = require("mongoose");
// const tagSchema = mongoose.Schema({name: String});
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
        type: [String],
    }
})

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;