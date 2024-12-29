import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";

export const signup = async (req, res) => {
    
    try {
        const { name, username, email, password } = req.body;
        if(!name || !username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const verificationToken = generateVerificationToken();

        const user = new User({
            name,
            username,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpireAt: new Date(Date.now() + 24 * 60 * 60 * 1000) //24 hours
        });

        await user.save();

        // jwt token
        generateTokenAndSetCookie(res, user._id);

        //send verification email
        await sendVerificationEmail(user.email, user.username, verificationToken);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined
            }
            });
    
    } catch (error) {
        console.log("Error in signup: ", error.message);
        res.status(500).json({ message: error.message });
    }
};

export const verifyEmail = async (req, res) => {
    const {code} = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpireAt: { $gt: Date.now() }
        })

        if(!user) {
            return res.status(400).json({ message: "Invalid or expired verification code" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpireAt = undefined;
        await user.save();

        const profileUrl = process.env.CLIENT_URL + "/profile/" + user.username;

        await sendWelcomeEmail(user.email, user.username, profileUrl);

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: {
                ...user._doc,
                password: undefined
            }
         });

    } catch (error) {
        console.log("Error in verifyEmail: ", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //check if user exists
        const user = await User.findOne({ username });
        if(!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        //check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        if(!user.isVerified) {
            return res.status(400).json({ message: "Please verify your email" });
        }

        // send jwt token
        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = Date.now();
        await user.save();

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                ...user._doc,
                password: undefined
            }
         });

    } catch (error) {
        console.log("Error in login: ", error.message);
        res.status(500).json({ message: error.message });
    }
};

export const logout = async (req, res) => {
    res.clearCookie("jwt-tech-connect");
    res.status(200).json({ message: "Logged out successful" });
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if(!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        // generate reset token
        const resetToken = generateVerificationToken();
        user.resetToken = resetToken;
        user.resetTokenExpireAt = new Date(Date.now() + 15 * 60 * 1000); //15 minutes
        await user.save();

        //send reset password email
        const resetUrl = process.env.CLIENT_URL + "/resetPassword/" + resetToken;
        await sendPasswordResetEmail(user.email, user.username, resetUrl);

        res.status(200).json({ message: "Reset password email sent successfully" });

    } catch (error) {
        console.log("Error in forgotPassword: ", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        if(!token || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ 
            resetToken: token, 
            resetTokenExpireAt: { $gt: Date.now() } 
        });

        if(!user) {
            return res.status(400).json({ message: "Invalid or expired reset token" });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
        //reset token and expire at to undefined
        user.resetToken = undefined;
        user.resetTokenExpireAt = undefined;
        await user.save();

        //send password reset success email
        await sendResetSuccessEmail(user.email, user.username);

        res.status(200).json({ message: "Password reset successful" });

    } catch (error) {
        console.log("Error in resetPassword: ", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const getCurrentUser = async (req, res) => {
	try {
		res.json(req.user);
	} catch (error) {
		console.error("Error in getCurrentUser controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};