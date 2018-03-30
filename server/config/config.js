const encrypt = require('crypto')

module.exports = {
  cookieMaxAge: 1000 * 60 * 15,
  mongoDBUri: 'mongodb://localhost:27017/chat-room',
  databaseName: 'chat-room',
  sessionCollection: 'session',
  accountCollection: 'account',
  sessionSecret: 'txwang',
  webPort: 3000,
  webUrl: '127.0.0.1',
  tokenSecret: encrypt.createHash("sha256").update('chat-room').digest('base64')
};
