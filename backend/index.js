import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import User from "./models/user.model.js";
import Email from "./models/email.model.js";

// Load env variables
dotenv.config();

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "https://upgraded-bassoon-r4v5q7vwj954hxv69-5173.app.github.dev",
    credentials: true,
  })
);

// 🔹 Connect DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ DB Connection Failed:", err.message);
    process.exit(1);
  }
};

// 🔹 Routes



// Create new user
app.post("/create-user", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// Create new email subscription
app.post("/create-sub", async (req, res) => {
  try {
    const newEmail = new Email(req.body);
    await newEmail.save();
    res.status(201).json(newEmail);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// Get all email subscribers
app.get("/email-subs", async (req, res) => {
  try {
    const subs = await Email.find();
    res.send(subs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Admin password check
app.post("/check", (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASS) {
    return res.json({ ok: true });
  } else {
    return res.status(401).json({ ok: false, message: "Wrong password" });
  }
});

// 🔹 Serve Frontend (for production build)
// resolve to sibling frontend/dist (not backend/frontend/dist) and only register if exists
const frontDistPath = path.resolve(__dirname, "../frontend/dist");
if (fs.existsSync(frontDistPath)) {
  app.use(express.static(frontDistPath));

  // serve index.html for any non-API route
  app.get(/.*/, (_, res) => {
    res.sendFile(path.resolve(frontDistPath, "index.html"));
  });
} else {
  console.warn(`Frontend build not found at ${frontDistPath} — static serving skipped.`);
}

// 🔹 Start Server only after DB connects
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();

// Export for vercel (optional)
export default app;
