const express = require("express");
const router = express.Router();
const { forwardToAI } = require("../utils/forwarder");

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const reply = await forwardToAI(prompt);
    res.json({ reply });
  } catch (error) {
    console.error("❌ API Error:", error.message);
    res.status(500).json({ error: "AI API Error", details: error.message });
  }
});

module.exports = router;
