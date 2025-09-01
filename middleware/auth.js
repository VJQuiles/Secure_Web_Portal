require('dotenv').config()
const jwt = require('jsonwebtoken')

// Here, we set up local authentication. 
// A token should be sent in headers. That token will then be decoded and stored into payload.
// From there we create a req.user, which will allow us to access the information in the payload. 
// Token generation is handled in userController
function verifyUser(req, res, next) {
    try {
        let token = req.headers.authorization

        if (!token || !token.startsWith('Bearer ')) return res.status(401).json({ error: "Missing token or incorrect format" })

        token = token.split(' ').pop().trim()

        const secret = process.env.JWT_SECRET
        const payload = jwt.verify(token, secret)

        req.user = payload.data

        next()

    } catch (error) {
        res.status(401).json({ error: 'Bad token' })
        ////////////////////////////
        //Take this out at the end//
        ////////////////////////////
        console.error(error)
    }
}

module.exports = verifyUser