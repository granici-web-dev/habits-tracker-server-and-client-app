import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Progress from "./models/Progress.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Habits Tracker API!");
});

app.post("/habits", async (req, res) => {
  try {
    const { habitId, date, completed, notes, mood } = req.body;
    const progress = new Progress({
      habit: habitId,
      date,
      completed,
      notes,
      mood,
    });
    await progress.save();
    res.status(201).json(progress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/habits", async (req, res) => {
  try {
    const progressEntries = await Progress.find().populate("habit");
    res.json(progressEntries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/habits/:id", async (req, res) => {
  try {
    const progressEntry = await Progress.findById(req.params.id).populate(
      "habit",
    );
    if (!progressEntry) {
      return res.status(404).json({ error: "Progress entry not found" });
    }
    res.json(progressEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://127.0.0.1:${PORT}`);
});
