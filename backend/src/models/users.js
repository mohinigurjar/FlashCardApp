const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 4,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Credentials");
            }
        },
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 15,  
        validate(value) {
            if(!validator.isStrongPassword(value)){
                throw new Error("Invalid Credentials");
            }
        }    
    }
},
{timestamps : true});



const User = mongoose.model('User', userSchema);

module.exports = User;