require('dotenv').config()
const mongoose = require('mongoose')

// Connection for our MongoDB Server. Error handlers in place for an issues either connecting, or during connection
const connect = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log(`Connection to ${mongoose.connection.name} successful`))
        .catch((err) => {
            console.error("DB Connection Error:", err)
            process.exit(1)
        })

    mongoose.connection.on('error', error => {
        console.error("Error occured during connection", error.message)
    })
}

module.exports = connect