const jwt = require('jsonwebtoken')
const config = require('../config/config')

const Account = require('../util/account')

const doSignIn = (req, res) => {
  const userName = req.body.userName
  const password = req.body.password
  Account.signIn(userName, password, (err, account) => {
    if (err) {
      res.send(JSON.stringify(err))
    } else {
      performSignIn(req, res, account)
    }
  })
}

const doSignUp = (req, res) => {
  const userName = req.body.userName
  const password = req.body.password
  Account.signUp(userName, password, (err, account) => {
    if (err) {
      res.send(JSON.stringify(err))
    } else {
      performSignIn(req, res, account)
    }
  })
}

const performSignIn = (req, res, account) => {
  const token = jwt.sign({userName: account.userName}, config.tokenSecret, {expiresIn: 3600})
  res.send(JSON.stringify({userName: account.userName, token}))
}

const uploadAvatar = (req, res) => {
  if (req.userName) {
    Account.uploadAvatar(req.userName, req.body, err => {
      if (err) {
        res.send(JSON.stringify(err))
      } else {
        res.send(JSON.stringify({avatar: true}))
      }
    })
  }else{
    res.send(JSON.stringify({err: 'please sign in first'}))
  }
}

const doSignOut = (req, res) => {
  delete(req.userName)
  res.send({status: 'succuess'})
}

const doAuth = (req, res) => {
  const userName = req.userName
  if (userName) {
    res.send(JSON.stringify({auth: true, userName}))
  } else {
    res.send(JSON.stringify({auth: false}))
  }
}

const getAvatar = (req, res) => {
  const userName = req.query.userName

}

module.exports = {
  doSignIn,
  doSignUp,
  uploadAvatar,
  doSignOut,
  doAuth,
  getAvatar
}
