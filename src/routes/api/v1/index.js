const Router = require('koa-router')

const router = new Router()

router.use(require('./auth'))

module.exports = router.routes()
