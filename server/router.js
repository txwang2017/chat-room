const router = require('express').Router()

const doGet404 = require('./controller/404/404')
const doSignIn = require('./controller/account/sign-in')

router.get('/sign-in', (req, res) => {
  res.render('account/index')
})

router.post('/sign-in', doSignIn)

router.get('/*', doGet404)

module.exports = router