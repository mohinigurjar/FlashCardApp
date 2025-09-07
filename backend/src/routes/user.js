const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

userRouter.get('/profile', userAuth, async(req, res) => {
    try{
        const user = req.user;
        
        // Send only safe user data (exclude password and sensitive info)
        const userProfile = {
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
        
        res.send(userProfile);

    }catch(error) {
        res.status(400).send("ERROR : " + error.message);

    }
  
})

module.exports = userRouter;