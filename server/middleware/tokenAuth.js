const jwt = require('jsonwebtoken')
const config = require('../config/config')

const tokenAuth = (req, res, next) => {
  const token = req.headers['access-token']
  if(token){
    jwt.verify(token, config.tokenSecret, (err, decoded) => {
      if(!err){
        req.userName = decoded.userName
      }
    })
  }
  next()
}

module.exports = tokenAuth