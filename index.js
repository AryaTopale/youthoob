import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js"
import videoRoutes from "./routes/videos.js"
import commentRoutes from "./routes/comments.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser"

// Load environment variables
dotenv.config();

// Debugging log
console.log('MONGO URI:', process.env.MONGO);

const app = express();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to DataBase');
    } catch (err) {
        console.error('Failed to connect to DataBase:', err);
    }
};

app.use(express.json())
app.use(cookieParser())
app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/comments",commentRoutes)
app.use("/api/videos",videoRoutes)


app.use((err,req,res,next)=>{
    const status=err.status||500;
    const message=err.mesage||"Something went wrong";
    return res.status(status).json({
        success:false,
        status,
        message
    })
})

app.listen(8800, () => {
    connect();
    console.log('Server is running on port 8800');
});
