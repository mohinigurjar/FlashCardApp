const mongoose = require("mongoose");
const validator = require("validator");
// const tagSchema = mongoose.Schema({name: String});
const cardSchema = mongoose.Schema({
    question: {
        type: String,
        required: true,
        maxlength: 1000,
    },
    answer: {
        type: String,
        required: true,
        maxlength: 1000,
    },
    bookmarked: {
        type: Boolean,
        default: false,
    },
    tags: {
        type: [String],
        required: true,
        validate(value){
            if(value.length > 7)
                throw new Error("Maximum 7 tags are allowed");
        }   
     },
    
}, 
   {
    timestamps: true,
    })

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;