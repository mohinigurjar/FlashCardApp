const validator = require("validator");

const validateSignUpData = (req) => {
    const {name, email, password} = req.body;
    if(!name){
        throw new Error("Please enter name");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Enter valid email");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Enter strong password");
    }
}

const validateFlashcardData = (req) => {
    const {question, answer, tags, bookmarked} = req.body;
    if(!question){
        throw new Error("Please enter question");
    }
    else if(!answer){
        throw new Error("Please enter answer");
    }
    else if(!tags){
        throw new Error("Please enter tags");
    }
    else if(tags.length > 7){
        throw new Error("Maximum 7 tags are allowed");
    }
    else if(bookmarked !== undefined && typeof bookmarked !== "boolean"){
        throw new Error("Bookmarked must be a boolean");
    }
}

module.exports = {
    validateSignUpData,
    validateFlashcardData,
}