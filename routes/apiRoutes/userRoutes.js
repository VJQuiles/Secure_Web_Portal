const router = require('express').Router()
const userController = require('../../controllers/userController')
const passport = require('passport')

router.post('/register', userController.createUser)
router.post('/login', userController.loginUser)

router.get('/welcome', userController.welcomeUser)

// OAuth
// router.get('/github', passport.authenticate('github'))

// router.get(
//     '/github/callback',
//     passport.authenticate('github', { failureRedirect }),
//     (req, res) => {
//         res.redirect('/api/users/welcome')
//     }
// )

module.exports = router