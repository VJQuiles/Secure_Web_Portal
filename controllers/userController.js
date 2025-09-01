require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const secret = process.env.JWT_SECRET
const expiration = '1h'

async function createUser(req, res) {
    try {
        const existingUser = await User.findOne({ email: req.body.email })
        if (existingUser) return res.status(400).json({ error: 'User already exists' })

        const newUser = await User.create(req.body)
        res.status(201).json({
            success: `Hello, ${newUser.username}.`
        })

        const payload = {
            _id: newUser.id,
            username: newUser.username,
            email: newUser.email
        }

        jwt.sign(
            { data: payload },
            secret,
            { expiresIn: expiration },
            (error, token) => {
                if (error) throw error
                res.status(200).json({ success: `User creation successful. Token: ${token}` })
            }
        )

        res.redirect('/api/users/welcome')

    } catch (error) {
        res.status(400).json({ "Error creating user": error.message })
        ////////////////////////////
        //Take this out at the end//
        ////////////////////////////
        console.error(`Error creating user: ${error}`)
    }
}

async function loginUser(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(400).json({ message: "Lemme see your belly button! Apparently you don't exist!" })

        const correctPassword = await user.isCorrectPassword(req.body.password)
        if (!correctPassword) return res.status(400).json({ message: "That's not the magic word" })

        const payload = {
            _id: user.id,
            username: user.username,
            email: user.email
        }

        jwt.sign(
            { data: payload },
            secret,
            { expiresIn: expiration },
            (error, token) => {
                if (error) throw error
                res.status(200).json({ success: `Login Successful. Token: ${token}` })
            }
        )



    } catch (error) {
        res.status(400).json({ "Error during login.": error.message })
        console.error(`Error logging in user: ${error}`)
    }
}

function welcomeUser(req, res) {
    if (!req.user) return res.status(401).json({ error: 'You must be logged in to view this page' })
    res.send(`Welcome ${req.user.username} :)`)
}

module.exports = {
    createUser,
    loginUser,
    welcomeUser
}