const mongoose = require('mongoose')

const config = require('../config/config')

const accountSchema = mongoose.Schema({
  userName: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  avatar: String
});

const Account = mongoose.model(config.accountCollection, accountSchema)

module.exports = Account