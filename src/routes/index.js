const Router = require('koa-router')

const router = new Router()

router.get('/', ctx => {
  ctx.body = `Welcome`
})

router.use(require('./auth'))

module.exports = router
