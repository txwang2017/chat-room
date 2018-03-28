const encrypt = require('crypto')
const fs = require('fs')
const path = require('path')

const Account = require('../model/account')

const sha256 = password => {
  return encrypt.createHash("sha256").update(password).digest('base64')
}

const performSignIn = (req, res, account) => {
  res.send(JSON.stringify(account))
}

const signIn = (userName, password, req, res) => {
  password = sha256(password)
  Account.findOne({userName}, (err, account) => {
    if(err){
      console.log(err)
      res.send(JSON.stringify({err: 'unknown error, please try again'}))
      return
    }
    if(account){
      if(account.password === password){
        performSignIn(req, res, account)
      } else{
        res.send(JSON.stringify({err: 'password is not correct'}))
      }
    } else{
      res.send(JSON.stringify({err: 'user name dose not exist'}))
    }
  })
}

const signUp = (userName, password, req, res) => {
  password = sha256(password)
  Account.create({
    userName,
    password
  }, (err, account) => {
    if(err){
      res.send(JSON.stringify({err: "user name already exist"}))
    } else{
      performSignIn(req, res, account)
    }
  })
}

const uploadAvatar = (userName, avatarBuff, callback) => {
  const avatarPath = path.join(__dirname, '../../client/uploads/avatar', userName)
  console.log(avatarPath)
  fs.writeFile(avatarPath, avatarBuff, callback)
}

module.exports = {
  signIn,
  signUp,
  uploadAvatar
}