const Router = require('koa-router')
const mainController = require('../controllers/main')
const pool = require('../config/connectDB')

const router = new Router()
const main = mainController(pool)

router.get('/', main.mainGetHandler)

module.exports = router.routes()
