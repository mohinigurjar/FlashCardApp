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

    // else if(!Array.isArray(tags)){
    //     throw new Error("Tags must be an array of strings");
    // }

    // else if(!tags.every(tag => typeof tag === "string")){
    //     throw new Error("Each tag must be a string");
    // }

    // else if(tags.some(tag => tag.trim() === "")){
    //     throw new Error("Tags cannot be empty strings");
    // }

    // else if(tags.some(tag => tag.length > 30)){
    //     throw new Error("Each tag must be less than 30 characters");
    // }

    else if(tags.length !== new Set(tags).size){
        throw new Error("Tags must be unique");
    }

    // else if(tags.length > 7){
    //     throw new Error("A maximum of 7 tags are allowed");
    // }

    else if(typeof question !== "string"){
        throw new Error("Question must be a string");
    }
    else if(typeof answer !== "string"){
        throw new Error("Answer must be a string");
    }
    else if(tags.length === 0){
        throw new Error("At least one tag is required");
    }
    // else if(tags.length > 7){
    //     throw new Error("A maximum of 7 tags are allowed");
    // }
    

  

    else if(bookmarked !== undefined && typeof bookmarked !== "boolean"){
        throw new Error("Bookmarked must be a boolean");
    }
}

validateEditProfileData = (req) => {
    const allowedEditFields = ["name", "email"];

    const isEditAllowed = Object.keys(req.body).every(field => 
        allowedEditFields.includes(field));

    return isEditAllowed;
}

module.exports = {
    validateSignUpData,
    validateFlashcardData,
    validateEditProfileData
}