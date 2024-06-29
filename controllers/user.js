import User from "../models/User.js";

// Function to update user details
export const update = async (req, res, next) => {
    if (req.params.id == req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json(updatedUser);
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "You can update only your account"));
    }
};

// Function to delete a user
export const deleteUser = async (req, res, next) => {
    if (req.params.id == req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "User deleted successfully" });
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "You can delete only your account"));
    }
};

// Function to get a user
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

// Function to subscribe to a user
export const subscribe = async (req, res, next) => {
    try {
        // Subscription logic here
        res.status(200).json({ message: "Subscribed successfully" });
    } catch (err) {
        next(err);
    }
};

// Function to unsubscribe from a user
export const unsubscribe = async (req, res, next) => {
    try {
        // Unsubscription logic here
        res.status(200).json({ message: "Unsubscribed successfully" });
    } catch (err) {
        next(err);
    }
};

// Function to like a user's content
export const like = async (req, res, next) => {
    try {
        // Like logic here
        res.status(200).json({ message: "Liked successfully" });
    } catch (err) {
        next(err);
    }
};

// Function to dislike a user's content
export const dislike = async (req, res, next) => {
    try {
        // Dislike logic here
        res.status(200).json({ message: "Disliked successfully" });
    } catch (err) {
        next(err);
    }
};

// Error handling utility function
function createError(status, message) {
    const error = new Error(message);
    error.status = status;
    return error;
}
    