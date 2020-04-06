const router = require("express").Router()
const passport = require("passport")
const CLIENT_HOME_PAGE_URL = "https://bva-jccc-fcc.herokuapp.com"
// ( !process.env.MONGOLAB_YELLOW_URI ? "http://localhost:3000/polls" : "https://bva-jccc-fcc.herokuapp.com/polls" ) // React 3000

// when login is successful, retrieve user info
router.get("/auth/login/success", (req, res) => {
  var ipAddr = req.headers["x-forwarded-for"]
  if (ipAddr){
    var list = ipAddr.split(",")
    ipAddr = list[list.length-1]
  } else {
    ipAddr = req.connection.remoteAddress
  }

  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies,
      ip: ipAddr,
    })
  } else {
    res.json({
      success: false,
      message: "user hasn't authenticated",
      ip: ipAddr,
    })
  }
})

// when login failed, send failed msg
router.get("/auth/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate.",
  })
})

// When logout, redirect to client
router.get("/auth/logout", (req, res) => {
  req.logout()
  res.redirect(CLIENT_HOME_PAGE_URL)
})

// auth with twitter
router.get("/auth/twitter", passport.authenticate("twitter"))

// redirect to home page after successfully login via twitter
router.get("/auth/twitter/redirect", (req, res) => {
  passport.authenticate("twitter", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/auth/login/failed"
  })
})

module.exports = router
