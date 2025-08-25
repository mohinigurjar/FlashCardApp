const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 15,
        // valid(value){
        //     if
        // }
    }
});



const User = mongoose.model('User', userSchema);

module.exports = User;