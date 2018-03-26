const mongoose = require('mongoose')

const config = require('./config/config')

mongoose.connect(config.mongoDBUri)

module.exports = mongoose.connection;