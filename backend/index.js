 import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.model.js";
import cors from "cors";
import Email from "./models/email.model.js"




dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'https://automatic-train-jjwpvrwg55j4fjr5w-5173.app.github.dev',
  credentials: true
}))



// 🔹 DB connection function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ Connected to DB");
  } catch (err) {
    console.error("❌ DB Connection Failed:", err.message);
    process.exit(1); // agar DB connect na ho to process exit kar do
  }
};

// 🔹 Root route
app.get("/", (req, res) => {
  res.send("I am the main page");
});

// 🔹 Create user route
app.post("/create-user", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
});

app.post("/create-sub", async (req, res) => {
  try {
    const newEmail = new Email(req.body);
    await newEmail.save();
    res.status(201).json(newEmail);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
});

app.get("/email-subs", async (req,res)=>{
  try{
    const subs  = await Email.find();
    res.send(subs)
  }
  catch(err){
    console.log(err)
    res.send(err)
  }
})

app.get("/users", async (req,res)=>{
  try{
    const users  = await User.find();
    res.send(users)
  }
  catch(err){
    console.log(err)
    res.send(err)
  }
})
// Route to check password
app.post("/check", (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASS) {
    return res.json({ ok: true });
  } else {
    return res.status(401).json({ ok: false, message: "Wrong password" });
  }
});



app.listen(process.env.PORT || 5000, () => {
  connectDB();
  console.log(`🚀 Server is live at port ${process.env.PORT || 5000}`);
});

//export server for vercel
export default app;