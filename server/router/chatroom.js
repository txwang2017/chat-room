const router = require('express').Router()

router.get('/', (req, res) => {
  res.render('chatroom/index')
})

module.exports = router