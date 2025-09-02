require('dotenv').config()
const passport = require('passport')
const { Strategy: GithubStrategy } = require('passport-github2')
const User = require('../models/User')
const randomString = require('randomstring')

//Here we define the necessary options, or information that will be passed into the strategy we outline
const options = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    scope: ['user:email']
}

//Here we define the actual strategy. First we identify if the user signing in exists, if not we create a user. 
// For the password, I followed the advice of one of my instructors, and installed randomstring.
// https://www.npmjs.com/package/randomstring
passport.use(new GithubStrategy(
    options,
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ githubId: profile.id })
            ////////////////////////////
            //Take this out at the end//
            ////////////////////////////
            console.log(profile)

            if (!user) {
                await User.create({
                    githubId: profile.id,
                    username: profile.username,
                    email: profile.emails[0].value,
                    password: randomString.generate(10)
                })
            }

            return done(null, user)

        } catch (error) {
            return done(error, false)
        }
    })
)

// Now we use express-session to implement the strategy, this process will be finished in server.js
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        return done(null, user)
    } catch (error) {
        done(null, false)
    }
})