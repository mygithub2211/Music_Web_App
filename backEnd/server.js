const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://new_user:Z0v4rz23993@mycluster.xazafns.mongodb.net/Ptran_Database", {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// User schema and model
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Register route
app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const newUser = new User({ firstName, lastName, email, password });
  try {
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
    const user = await User.findOne({ email, password });
    if (user) {
      res.json({ success: true });
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
  const newSong = new myList({ title, subtitle, src, imgSrc });
  try {
    await newSong.save();
    res.status(201).json({ message: "Song added to my_songs successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add song to my_songs" });
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
