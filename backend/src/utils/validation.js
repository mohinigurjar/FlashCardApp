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

module.exports = {
    validateSignUpData,
}