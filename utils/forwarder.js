const axios = require("axios");

const AGENT_API_URL = process.env.AGENT_API_URL;
const AGENT_API_KEY = process.env.AGENT_API_KEY;
const AGENT_MODEL = process.env.AGENT_MODEL || "gpt-4o-mini";

async function forwardToAI(prompt) {
  if (!AGENT_API_KEY || !AGENT_API_URL) {
    throw new Error("Missing API URL or Key");
  }

  try {
    const response = await axios.post(
      AGENT_API_URL,
      {
        model: AGENT_MODEL,
        messages: [{ role: "user", content: prompt }]
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AGENT_API_KEY}`
        }
      }
    );

    const reply = response.data?.choices?.[0]?.message?.content || "No response from AI";
    return reply;
  } catch (err) {
    console.error("OpenAI API Error:", err.response?.data || err.message);
    throw new Error(err.response?.data?.error?.message || err.message);
  }
}

module.exports = { forwardToAI };
