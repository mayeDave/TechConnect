import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";

export const getSuggestedConnections = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user._id).select("connections");

        // Find users who are not already connected, not the current user, and are verified
        const suggestedUsers = await User.find({
            _id: {
                $ne: req.user._id, // Exclude the current user
                $nin: currentUser.connections // Exclude already connected users
            },
            isVerified: true // Only include verified users
        }).select("name username profilePicture headline connections isVerified");

        res.status(200).json(suggestedUsers);
        
    } catch (error) {
        console.error("Error in getSuggestedConnections controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};


export const getPublicProfile = async (req, res) => {
    try {
        
        const user = await User.findOne({ username: req.params.username }).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error in getPublicProfile controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const allowedFields = [
            "name",
            "username",
            "headline",
            "about",
            "location", 
            "profilePicture",
            "bannerImg",
            "skills",
            "experience",
            "education",
            ];

        const updatedData = {};
            
        for (const field of allowedFields) {
            if (req.body[field]) {
                updatedData[field] = req.body[field];
            }
        }

        // todo: check for the profile picture and banner image
        if(req.body.profilePicture) {
            const result = await cloudinary.uploader.upload(req.body.profilePicture);
            updatedData.profilePicture = result.secure_url;
        }

        if(req.body.bannerImg) {
            const result = await cloudinary.uploader.upload(req.body.bannerImg);
            updatedData.bannerImg = result.secure_url;
        }


        const user = await User.findByIdAndUpdate(req.user._id, { $set: updatedData }, { new: true }).select("-password");
        res.status(200).json(user);

    } catch (error) {
        console.error("Error in updateProfile controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};