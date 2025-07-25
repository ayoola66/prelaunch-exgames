require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// Serve static files from root directory
app.use(express.static(__dirname));

// Config endpoint with error handling
app.get("/config", (req, res) => {
  try {
    const config = JSON.parse(
      fs.readFileSync(path.join(__dirname, "config.json"), "utf8")
    );
    res.json(config);
  } catch (error) {
    console.error("Error reading config:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Serve index.html for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Server directory: ${__dirname}`);
});
