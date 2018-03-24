const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const config = require('./config/config.js')
const path = require('path')

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
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render(path.join(__dirname, 'frontend/index/index.html'))
})

app.listen(config.webPort, config.webUrl)