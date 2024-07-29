require("dotenv").config(); // Load dotenv at the very beginning

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

// Middleware
app.use(cors({
  origin: 'https://music-web-app-client.vercel.app', // Your frontend URL
  methods: ['GET', 'POST'], // Allowed methods
  allowedHeaders: ['Content-Type'], // Allowed headers
}));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// User schema and model
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("User", userSchema);

// Register route
app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  
  try {
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({ firstName, lastName, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ success: true, token });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to log in" });
  }
});

// Song schema and model
const songSchema = new mongoose.Schema({
  title: String,
  src: String,
  imgSrc: String,
  subtitle: String,
});

const Song = mongoose.model("Song", songSchema, "all_songs");

// Route to get songs
app.get("/songs", async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch songs" });
  }
});

// Route to search songs by title and subtitle
app.get("/search", async (req, res) => {
  const { query } = req.query;
  try {
    const songs = await Song.find({
      $or: [
        { title: new RegExp(query, "i") },
        { subtitle: new RegExp(query, "i") }
      ]
    });
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: "Failed to search songs" });
  }
});

// Model for my_songs collection
const myList = mongoose.model("MySong", songSchema, "myPlayList");

// Route to get songs from my_songs collection
app.get("/my_songs", async (req, res) => {
  try {
    const songs = await myList.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch songs" });
  }
});

// Route to add song to my_songs collection
app.post("/my_songs", async (req, res) => {
  const { title, subtitle, src, imgSrc } = req.body;
  try {
    await newSong.save();
    res.status(201).json({ message: "Song added to my_songs successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add song to my_songs" });
  }
});

// Simple route to check server status
app.get("/", (req, res) => {
  res.send("Server is running on port 5000");
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
