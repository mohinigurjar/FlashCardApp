const User = require("../models/users");
const jwt = require("jsonwebtoken");

const userAuth = async(req, res, next) => {
    try{
        const cookies = req.cookies; //read cookie - exists or not
        const { token } = cookies; //take the token from cookie

        if(!token){
            throw new Error("Invalid Token");
        }
        //found token--decode it to get id---decoding to get the payload
        const decodedObj = await jwt.verify(token, "SECRETKEY**234");

        const { _id } = decodedObj; //id from decodedObj is destructured

        const user = await User.findById(_id); //check if the user with that id exists in our db or not

        if(!user){
            throw new Error("User not found");
        }
// if found send the user to the req so that apis can access it from there
        req.user = user;
        next();
    }catch(error){
        res.status(400).send("ERROR : " + error.message);
    }
}

module.exports = { userAuth };