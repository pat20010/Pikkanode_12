const Router = require('koa-router')

const router = new Router()

const flash = async (ctx, next) => { // Flash middleware
  if (!ctx.session) throw new Error('flash message required session')
  ctx.flash = ctx.session.flash
  console.log(`session flash : ` + ctx.session.flash)
  delete ctx.session.flash
  await next()
}

router.use(flash)
router.use(require('./app'))

module.exports = router
