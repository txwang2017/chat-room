module.exports = {
    cookieMaxAge: 1000 * 60 * 15,
    mongoDBUri: 'mongodb://localhost:27017/chat-room',
    mongoStoreConfig: {
        uri: 'mongodb://localhost:27017/chat-room',
        databaseName: 'chat-room',
        collection: 'sessions'
    },
    sessionSecret: 'txwang'
};
