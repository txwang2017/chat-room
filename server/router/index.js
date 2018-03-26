const notFound = require('./404')
const account = require('./account')

const router = app => {
  app.use('/', account)

  app.use('/', notFound)
}

module.exports = router