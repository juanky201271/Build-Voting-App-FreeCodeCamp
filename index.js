const cookieSession = require("cookie-session")
const express = require("express")
const app = express()
const appPort = 3000
const passport = require("passport")
const bodyParser = require('body-parser')
const passportSetup = require("./config/passport-setup")
const session = require("express-session")
const authRouter = require("./routes/auth-router-ctrl")
const pollRouter = require('./routes/poll-router')
const userRouter = require('./routes/user-router')
const mongoose = require("mongoose")
const keys = require("./config/keys")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const db = require('./db')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(
  cookieSession({
    name: "session",
    keys: [keys.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 100
  })
)

app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

app.use(
  cors({
    origin: "http://localhost:8000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', pollRouter)
app.use('/api', userRouter)
app.use('/api', authRouter)

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated",
      ip: req.ip
    })
  } else {
    next()
  }
}

app.get("/", authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookies: req.cookies,
    ip: req.ip
  })
})

app.listen(appPort, () => console.log(`Server on Port ${appPort}`))