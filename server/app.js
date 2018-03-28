const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const config = require('./config/config.js')
const path = require('path')
const engine = require('consolidate')
const router = require('./router/index')
const db = require('./db')


app.engine('html', engine.htmling)
app.set('views', path.join(__dirname, '../client'))
app.set('view engine', 'html')

app.use(express.static(path.join(__dirname, '../client')))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.raw({type: 'application/octet-stream', limit: '2mb'}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    uri: config.mongoDBUri,
    databaseName: config.databaseName,
    collection: config.sessionCollection
  }),
  cookie: {
    maxAge: config.cookieMaxAge
  },
}))

router(app)

app.listen(config.webPort, config.webUrl)