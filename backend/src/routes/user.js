const express = require("express");
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const { validateEditProfileData, validatePasswordResetData} = require("../utils/validation")

const { userAuth } = require("../middlewares/auth");

userRouter.get('/profile', userAuth, async(req, res) => {
    try{
        const user = req.user;
        
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

userRouter.patch('/profile/edit', userAuth, async(req, res) => {
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid edit request");
        }

        const loggedInuser = req.user;
        Object.keys(req.body).forEach((key) => (loggedInuser[key] = req.body[key]));
        await loggedInuser.save();
        // console.log(loggedInuser);
        res.json(
            {message : `${loggedInuser.name}, your profile is updated`,
                data: loggedInuser,
            }
        )
    }catch(error) {
        res.status(400).send("ERROR : " + error.message);
    }
    
})

userRouter.patch('/profile/password', userAuth, async(req, res) => {

    try{
        const user = req.user;
        const {oldPassword, newPassword} = req.body;

        if(!oldPassword || !newPassword) {
            return res.status(400).send("oldpassword and newpassword are required")
        }
        const isPasswordValid = await user.validatePassword(oldPassword);

        if(!isPasswordValid){
            return res.status(400).send("Invalid old password");
        }

        validatePasswordResetData(req);
       
        // Update the password
        const passwordHash = await bcrypt.hash(newPassword, 10);
        user.password = passwordHash;

        
        await user.save();

        res.status(200).send("Password updated successfully");
        
    }catch(error){
        res.status(400).send("ERROR : " + error.message);
    }

})
// userRouter.patch('/profile/password', userAuth, async(req, res) => {
//     try{
//         const user = req.user;
//         const {password} = req.body;
//         user.password = password;
//         await user.save();
//         res.send("Password updated successfully");
//     }
//     catch(error){
//         res.status(400).send("ERROR : " + error.message);
//     }
// })


module.exports = userRouter;