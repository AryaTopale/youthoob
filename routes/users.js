import express from "express";
import { deleteUser, getUser, subscribe, unsubscribe, like, dislike, update } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// Updating a user
router.put("/:id", verifyToken, update);

// Deleting a user
router.delete("/:id", verifyToken, deleteUser);

// Getting a user
router.get("/find/:id", verifyToken, getUser);

// Subscribing to a user
router.post("/subscribe/:id", verifyToken, subscribe);

// Unsubscribing from a user
router.post("/unsubscribe/:id", verifyToken, unsubscribe);

// Liking a user's content
router.post("/like/:id", verifyToken, like);

// Disliking a user's content
router.post("/dislike/:id", verifyToken, dislike);

export default router;
