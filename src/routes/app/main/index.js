const Router = require('koa-router')

const main = require('../../../controllers/app/main')

const router = new Router()

router.get('/', main.mainGetHandler)

module.exports = router.routes()
