const router = require('express').Router()
const multer = require('multer')
const upload = multer()

const account = require('../controller/account')

router.get('/', (req, res) => {
  res.render('account/index')
})

router.post('/sign-in', account.doSignIn)

router.post('/sign-up', account.doSignUp)

router.post('/upload-avatar', upload.single('avatar'), account.uploadAvatar)

router.post('/auth', account.doAuth)

router.get('/get-avatar', account.getAvatar)

router.get('/sign-out', account.doSignOut)

module.exports = router