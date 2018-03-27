const router = require('express').Router()
const multer = require('multer')
const upload = multer()


const account = require('../controller/account')

router.get('/account', (req, res) => {
  res.render('account/index')
})

router.post('/sign-in', account.doSignIn)

router.post('/sign-up', account.doSignUp)

router.post('/upload-avatar', upload.single('avatar'), account.uploadAvatar)

module.exports = router