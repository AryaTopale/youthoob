import mongoose from "mongoose";
import User from "../models/User.js"; // Assuming User.js exports a Mongoose model
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
export const signin=async (req,res)=>{
    try {
        const user=await User.findOne({name:req.body.name})
        if(!user) return next(404,"User Not Found")
        const isCorrect=await bcrypt.compare(req.body.password,user.password)
        if(!isCorrect)return next(400,"Wrong Credentials")
        const token=jwt.sign({id:user._id},process.env.JWT)
        const {password,...others}=user.__doc;
        res.cookie("access_token",token,{httpOnly:true}).status(200).json(others)
    }catch(err){
        next(err)
    }
};
export const signup = async (req, res) => {
    try {
        const { password, ...userData } = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({
            ...userData,
            password: hashedPassword
        });
        await newUser.save();
        res.status(200).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        next(err)
    }
};
