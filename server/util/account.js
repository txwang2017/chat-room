const encrypt = require('crypto')
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

const Account = require('../model/account')

const sha256 = password => {
  return encrypt.createHash("sha256").update(password).digest('base64')
}

const signIn = (userName, password, callback) => {
  password = sha256(password)
  Account.findOne({userName}, (err, account) => {
    if(err){
      callback({err: 'unknown error, please try again'}, null)
      return
    }
    if(account){
      if(account.password === password){
        callback(null, account)
      } else{
        callback({err: 'password is not correct'}, null)
      }
    } else{
      callback({err: 'user name dose not exist'}, null)
    }
  })
}

const signUp = (userName, password, callback) => {
  password = sha256(password)
  Account.create({
    userName,
    password
  }, (err, account) => {
    if(err){
      callback({err: "user name already exist"}, null)
    } else{
      callback(null, account)
    }
  })
}

const uploadAvatar = (userName, avatarBuff, callback) => {
  const avatarPath = path.join(__dirname, '../../uploads/avatar', userName)
  fs.writeFile(avatarPath, avatarBuff, err => {
    callback(err)
  })
}

const auth = (token, res, callback) => {
  jwt.verify(token, config.tokenSecret, (err, decoded) => {
    if(err){
      callback(err, null)
      return
    }
    const userId = decoded.id
    Account.findOne({_id: userId}, (err, account) => {
      if(err){
        callback(err, null)
        return
      }
      callback(null, account)
    })
  })
}

module.exports = {
  signIn,
  signUp,
  uploadAvatar,
  auth
}