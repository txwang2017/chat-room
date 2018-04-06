const router = require('express').Router()
const {getUserList} = require('../controller/chatroom')

router.get('/', (req, res) => {
  res.render('chatroom/index')
})

router.get('/user-list', getUserList)

module.exports = router