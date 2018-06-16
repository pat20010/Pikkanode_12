const Router = require('koa-router')

const router = new Router()

router.get('/',async ctx => {
  await ctx.render('index')
})

router.use(require('./auth'))

module.exports = router
