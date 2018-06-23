const Router = require('koa-router')
const mainController = require('../controllers/main')

const router = new Router()
const main = mainController()

router.get('/', main.mainGetHandler)

module.exports = router.routes()
