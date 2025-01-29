import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";
import connectionRoutes from "./routes/connection.route.js";
import messageRoutes from "./routes/message.route.js";
import rssRoutes from "./routes/rss.route.js";
import aiRoutes from "./routes/ai.route.js";

import { app, server } from "./config/socket.js";


dotenv.config();


const PORT = process.env.PORT || 6060;

app.use(express.json({ limit: "5mb"})); //parse json request body
app.use(cookieParser());
app.use(
    cors({
    origin: "http://localhost:5173",
    credentials: true
})
);


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/connections", connectionRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/rss", rssRoutes);
app.use("/api/v1/ai", aiRoutes);



server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
});