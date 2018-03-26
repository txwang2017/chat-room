const router = require('express').Router()

const account = require('../controller/account')

router.get('/account', (req, res) => {
  res.render('account/index')
})

router.post('/sign-in', account.doSignIn)

router.post('/sign-up', account.doSignUp)

module.exports = router