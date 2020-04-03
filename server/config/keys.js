// ADD YOUR OWN KEYS AND RENAME THIS FILE TO keys.js
const TWITTER_TOKENS = {
  TWITTER_CONSUMER_KEY: "jHqZUAYYhL3I1TFOBySsFQxtW",
  TWITTER_CONSUMER_SECRET: "ikSBfl9oaoMh86li09uCXCLpoPoX0o7L7pr036pLeTIA9wypax",
  TWITTER_ACCESS_TOKEN: "",
  TWITTER_TOKEN_SECRET: ""
}

const DB_USER = ""
const DB_PASSWORD = ""
const MONGODB = {
  MONGODB_URI: "mongodb://juanky201271:Calvo159@cluster0-shard-00-00-0ibmb.mongodb.net:27017,cluster0-shard-00-01-0ibmb.mongodb.net:27017,cluster0-shard-00-02-0ibmb.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
}

const SESSION = {
  COOKIE_KEY: "thisappisforvotingeverything"
}

const KEYS = {
  ...TWITTER_TOKENS,
  ...MONGODB,
  ...SESSION
}

module.exports = KEYS
