const router = require('express').Router()

const doGet404 = require('../controller/404')

router.get('/*', doGet404)

module.exports = router