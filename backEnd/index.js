require('dotenv').config() // load dotenv at the very beginning

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

// middleware
app.use(cors())
app.use(bodyParser.json())

// connect to mongodb
mongoose.connect(process.env.MONGODB_URI, {})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('connected to mongodb')
})

// user schema and model
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
})

const User = mongoose.model('User', userSchema)

// register route
app.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  const newUser = new User({ firstName, lastName, email, password })
  try {
    await newUser.save()
    res.status(201).json({ message: 'user registered successfully' })
  } catch (err) {
    res.status(500).json({ error: 'failed to register user' })
  }
})

// login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email, password })
    if (user) {
      res.json({ success: true })
    } else {
      res.json({ success: false })
    }
  } catch (err) {
    res.status(500).json({ error: 'failed to log in' })
  }
})

// song schema and model
const songSchema = new mongoose.Schema({
  title: String,
  src: String,
  imgSrc: String,
  subtitle: String,
})

const Song = mongoose.model('Song', songSchema, 'all_songs')

// route to get songs
app.get('/songs', async (req, res) => {
  try {
    const songs = await Song.find()
    res.json(songs)
  } catch (err) {
    res.status(500).json({ error: 'failed to fetch songs' })
  }
})

// route to search songs by title and subtitle
app.get('/search', async (req, res) => {
  const { query } = req.query
  try {
    const songs = await Song.find({
      $or: [
        { title: new RegExp(query, 'i') },
        { subtitle: new RegExp(query, 'i') }
      ]
    })
    res.json(songs)
  } catch (err) {
    res.status(500).json({ error: 'failed to search songs' })
  }
})

// model for my_songs collection
const myList = mongoose.model('MySong', songSchema, 'myPlayList')

// route to get songs from my_songs collection
app.get('/my_songs', async (req, res) => {
  try {
    const songs = await myList.find()
    res.json(songs)
  } catch (err) {
    res.status(500).json({ error: 'failed to fetch songs' })
  }
})

// route to add song to my_songs collection
app.post('/my_songs', async (req, res) => {
  const { title, subtitle, src, imgSrc } = req.body
  const newSong = new myList({ title, subtitle, src, imgSrc })
  try {
    await newSong.save()
    res.status(201).json({ message: 'song added to my_songs successfully' })
  } catch (err) {
    res.status(500).json({ error: 'failed to add song to my_songs' })
  }
})

// start the server
app.listen(5002, () => {
  console.log('server is running on port 5002')
})
