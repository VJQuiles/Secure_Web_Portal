require('dotenv').config()
const express = require('express')
const connect = require('./config/connection')
const routes = require('./routes')
require('./config/github-strategy')

const app = express()
const PORT = process.env.PORT || 3000

connect()

//OAuth

const session = require('express-session')
const passport = require('passport')
app.use(
    session({
        secret: process.env.GITHUB_CLIENT_SECRET,
        resave: false,
        saveUninitialized: false
    })
)
app.use(passport.session())

// End OAuth

app.use(express.json())

app.use(routes)

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})