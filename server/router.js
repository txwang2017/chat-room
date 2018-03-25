const router = require('express').Router()

const doGet404 = require('./controller/404')
const account = require('./controller/account')

router.get('/sign-in', (req, res) => {
  res.render('account/index')
})

router.post('/sign-in', account.doSignIn)

router.get('/*', doGet404)

module.exports = router