const router = require("express").Router()
const passport = require("passport")
const CLIENT_HOME_PAGE_URL = "http://localhost:3000/polls" // React 3000

// when login is successful, retrieve user info
router.get("/auth/login/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies,
      ip: req.ip
    })
  } else {
    res.json({
      success: false,
      message: "user hasn't authenticated",
      ip: req.ip
    })
  }
})

// when login failed, send failed msg
router.get("/auth/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate.",
    ip: req.ip
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
router.get("/auth/twitter/redirect", passport.authenticate("twitter", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/auth/login/failed"
  })
)

module.exports = router
