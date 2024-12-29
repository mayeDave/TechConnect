import jwt from "jsonwebtoken";

// generate token for three days

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "3d",
    });
    res.cookie("jwt-tech-connect", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days      
    });

    return token;
};