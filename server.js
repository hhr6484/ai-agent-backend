require("dotenv").config();
const express = require("express");
const cors = require("cors");

const agentRoutes = require("./routes/agent");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/chat", agentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
