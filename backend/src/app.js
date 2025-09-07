const express = require("express");
const connectDB = require("./config/database")
const cookieParser = require("cookie-parser");
const app = express();

// Import route modules
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const flashcardRouter = require('./routes/flashcard');
const bookmarkRouter = require('./routes/bookmark');

// Middleware setup 
app.use(express.json());
app.use(cookieParser());

// Route mounting (MUST come after middleware)
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', bookmarkRouter);  // Bookmark routes before flashcard routes
app.use('/api', flashcardRouter);

connectDB().then(() => {
    console.log("connection established");
    app.listen(5000, () => {
    console.log("App listening on port 5000");
})
})
.catch((error)=>{
    console.log("Error connecting to db" + error && error.message ? error.message : error);
});

