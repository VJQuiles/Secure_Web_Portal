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

    } catch (error) {
        res.status(400).json({ "Error creating user": error })
        ////////////////////////////
        //Take this out at the end//
        ////////////////////////////
        console.error(`Error creating user: ${error}`)
    }
}

async function loginUser(req, res) {

}

function welcomeUser(req, res) {

}

module.exports = {
    createUser,
    loginUser,
    welcomeUser
}