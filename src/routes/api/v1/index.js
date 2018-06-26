const Router = require('koa-router')
const koaBody = require('koa-body')

const router = new Router()

router.use(koaBody(), require('./auth'))

module.exports = router.routes()
