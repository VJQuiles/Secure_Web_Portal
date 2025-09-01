const router = require('express').Router()
const apiRoutes = require('./apiRoutes')

router.use('api', apiRoutes)

router.use((req, res) => {
    res.status(404).send('<h1>Did you send the right request type? (Hint: GET Vs. POST)</h1>')
})

module.exports = router 