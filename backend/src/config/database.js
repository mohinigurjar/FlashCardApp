const mongoose = require("mongoose");

const connectDB = async() => {
    await mongoose.connect(
        "mongodb+srv://mohini:nodejs%40123@nodejs.uod1gs4.mongodb.net/FlashCardApp"
    )
};

module.exports = connectDB;