import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    //schema for user in a tech-connect application
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: ""
    },
    bannerImg: {
        type: String,
        default: ""
    },
    headline: {
        type: String,
        default: "Tech Connect User"
    },
    location: {
        type: String,
        default: ""
    },
    about: {
        type: String,
        default: ""
    },
    skills: [String],
    experience: [
        {
            title: String,
            company: String,
            startDate: Date,
            endDate: Date,
            description: String
        },
    ],
    education: [
        {
            school: String,
            fieldOfStudy: String,
            startDate: Number,
            endDate: Number
        },
    ],
    connections: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetToken: String,
    resetTokenExpireAt: Date,
    verificationToken: String,
    verificationTokenExpireAt: Date
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;