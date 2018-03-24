const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const config = require('./config/config.js')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore(config.mongoStoreConfig),
    cookie: {
        maxAge: config.cookieMaxAge
    },
}))

app.get('/', (req, res) => {
    console.log(req.cookies)
    console.log(req.session)
    res.send('Hello World')
})


app.listen(3000, '127.0.0.1')