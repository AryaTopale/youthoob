import  express from "express";
import { signin, signup } from "../controllers/auth.js"

const router=express.Router();

router.post("/signup",signup) //creating a user

router.post("/signin",signin)

router.post("/google")

export default router;

