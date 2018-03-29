const jwt = require('jsonwebtoken')
const config = require('../config/config')

const Account = require('../util/account')

const doSignIn = (req, res) => {
  const userName = req.body.userName
  const password = req.body.password
  Account.signIn(userName, password, (err, account) => {
    if(err){
      res.send(JSON.stringify(err))
    } else{
      performSignIn(req, res, account)
    }
  })
}

const doSignUp = (req, res) => {
  const userName = req.body.userName
  const password = req.body.password
  Account.signUp(userName, password, (err, account) => {
    if(err){
      res.send(JSON.stringify(err))
    } else{
      performSignIn(req, res, account)
    }
  })
}

const performSignIn = (req, res, account) => {
  const token = jwt.sign({id: account._id}, config.tokenSecret, {expiresIn: 3600})
  res.send(JSON.stringify({userName: account.userName, token}))
}

const uploadAvatar = (req, res) => {
  const token = req.headers['access-token']
  if(token){
    Account.auth(token, res, (err, account) => {
      if(err){
        res.send(JSON.stringify(err))
        return
      }
      Account.uploadAvatar(account.userName, req.body, err => {
        if(err){
          res.send(JSON.stringify(err))
        } else{
          res.send(JSON.stringify({avatar: true}))
        }
      })
    })
  } else{
    res.send(JSON.stringify({err: 'please sign in first'}))
  }
}

const doSignOut = (req, res) => {

}

const doAuth = (req, res) => {
  const token = req.headers['access-token']
  if(token){
    Account.auth(token, res, (err, account) => {
      if(err){
        res.send(JSON.stringify({auth: false}))
      } else{
        res.send(JSON.stringify({auth: true, userName: account.userName}))
      }

    })
  } else{
    res.send(JSON.stringify({auth: false}))
  }
}

module.exports = {
  doSignIn,
  doSignUp,
  uploadAvatar,
  doSignOut,
  doAuth,
}
