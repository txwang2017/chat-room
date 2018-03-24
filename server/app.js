const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const config = require('./config/config.js')
const path = require('path')
const engine = require('consolidate')

app.engine('html', engine.htmling)
app.set('views', path.join(__dirname, '../client'))
app.set('view engine', 'html')

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
    res.render('index/index')
})

app.listen(config.webPort, config.webUrl)