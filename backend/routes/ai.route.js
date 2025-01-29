import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { protectRoute } from "../middleware/auth.middleware.js";

dotenv.config();
const router = express.Router();

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

router.post("/ai-chat", protectRoute, async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        const response = await axios.post(
            OPENAI_API_URL,
            {
                model: "gpt-4o-mini", // Use "gpt-4" if you have access to it
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7,
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        res.json({ response: response.data });
    } catch (error) {
        console.error("AI API Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to generate response" });
    }
});

export default router;
