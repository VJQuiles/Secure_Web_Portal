require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const connect = require('./config/connection')

connect()

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})