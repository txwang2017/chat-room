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
const tokenAuth = require('./middleware/tokenAuth')
const db = require('./db')
const http = require('http')

const server = http.createServer(app);
const io = require('socket.io').listen(server, {log:false});

app.engine('html', engine.htmling)
app.set('views', path.join(__dirname, '../client'))
app.set('view engine', 'html')

app.use(express.static(path.join(__dirname, '../client')))
app.use(express.static(path.join(__dirname, '../uploads')))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Access-Token');
  next()
})
app.use(tokenAuth)
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