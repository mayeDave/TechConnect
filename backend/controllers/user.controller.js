import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";

export const getSuggestedConnections = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user._id).select("connections");

        // find users who are not already connected and not our own profile

        const suggestedUsers = await User.find({
            _id: { $ne: currentUser._id, $nin: currentUser.connections 
            } // exclude current user and users already connected
        }).select("name username profilePicture headline")
        .limit(3); //limit suggests the number of connections you want displayed

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

        const updatedFields = {};
            
        for (const field of allowedFields) {
            if (req.body[field]) {
                updatedFields[field] = req.body[field];
            }
        }

        // todo: check for the profile picture and banner image
        if(req.body.profilePicture) {
            const result = await cloudinary.uploader.upload(req.body.profilePicture);
            updatedFields.profilePicture = result.secure_url;
        }

        if(req.body.bannerImg) {
            const result = await cloudinary.uploader.upload(req.body.bannerImg);
            updatedFields.bannerImg = result.secure_url;
        }


        const user = await User.findByIdAndUpdate(req.user._id, { $set: updatedFields }, { new: true }).select("-password");
        res.status(200).json(user);

    } catch (error) {
        console.error("Error in updateProfile controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};