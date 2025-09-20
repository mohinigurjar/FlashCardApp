import validator from 'validator';

export const validateSignUpData = (data) => {
    const {name, email, password} = data;
    if(!name){
        throw new Error("Please enter name");
    }
    else if(name.length < 4){
        throw new Error("Name must be at least 4 characters long");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Enter valid email");
    }       
    else if(!validator.isStrongPassword(password)){
        throw new Error("Enter strong password");
    }
    else if(confirmPassword != undefined && password !== data.confirmPassword){
        throw new Error("Passwords do not match");
    }
}

export const validateLoginData = (data) => {
    const {email, password} = data;
    if (!email) {
    throw new Error("Please enter your email");
    }

    if (!validator.isEmail(email)) {
        throw new Error("Please enter a valid email");
    }

    if (!password) {
        throw new Error("Please enter your password");
    }

    }
// export const validateFlashcardData = (data) => {
//     const {question, answer} = data;
//     if(!question){
//         throw new Error("Please enter a question");
//     }
//     else if(!answer){
//         throw new Error("Please enter an answer");
//     }
// }

// export const validateEditProfileData = (data) => {
//     const allowedEditFields = ["name", "email"];
//     const isEditAllowed = Object.keys(data).every(field => 
//         allowedEditFields.includes(field));
//     return isEditAllowed;
// }

