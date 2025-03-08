require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors()); 
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// app.post("/gemini", async (req, res) => {
//     const { role, message } = req.body;
//     if (!message) return res.status(400).json({ error: "Message is required" });

//     try {
//         const result = await model.generateContent(`${role}: ${message}`);
//         res.json({ response: result.response.text() });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "API request failed" });
//     }
// });

app.post("/gemini", async (req, res) => {
    const { roleDescription, message } = req.body;  // ✅ 解析 roleDescription 而不是 role
    if (!message) return res.status(400).json({ error: "Message is required" });

    try {
        const result = await model.generateContent(`${roleDescription}${message}`);
        res.json({ response: textResponse });
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: "API request failed" });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
