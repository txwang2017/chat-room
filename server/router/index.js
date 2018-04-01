const notFound = require('./404')
const account = require('./account')
const indexPage = require('./indexPage')
const chatRoom = require('./chatroom')

const router = app => {
  app.use('/account', account)
  app.use('/chat-room', chatRoom)
  app.use('/', indexPage)
  app.use('/', notFound)
}

module.exports = router