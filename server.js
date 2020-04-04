const cookieSession = require("cookie-session")
const path = require("path")
const express = require("express")
require("dotenv").config()
const app = express()
const PORT = process.env.PORT || 8000 // express
const passport = require("passport")
const bodyParser = require('body-parser')
const passportSetup = require("./config/passport-setup")
const session = require("express-session")
const authRouter = require("./routes/auth-router-ctrl")
const pollRouter = require('./routes/poll-router')
const userRouter = require('./routes/user-router')
const mongoose = require("mongoose")
//const keys = require("./config/keys")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const db = require('./db')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 100
  })
)

app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

app.use(
  cors({
    origin: ["http://localhost:3000", "https://bva-jccc-fcc.herokuapp.com"], // allow to server to accept request from different origin (React)
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, "client", "build")))

app.use('/api', pollRouter)
app.use('/api', userRouter)
app.use('/api', authRouter)


app.get('*', (req,res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

app.listen(PORT, () => console.log(`Server on Port ${PORT}`))
