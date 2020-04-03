const mongoose = require('mongoose')
const keys = require("../config/keys")

mongoose
  .connect(keys.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(e => { console.error('Conn error: ', e.message) })

const db = mongoose.connection

module.exports = db
