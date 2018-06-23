const Router = require('koa-router')

const router = new Router()

const authen = async (ctx, next) => { // Authen middleware
  if (ctx.session && ctx.session.userId) {
    console.log(`session userId : ${ctx.session.userId}`)
    await next()
    return
  }
  return ctx.redirect('/')
}

const flash = async (ctx, next) => { // Flash middleware
  if (!ctx.session) throw new Error('flash message required session')
  ctx.flash = ctx.session.flash
  console.log(`session flash : ` + ctx.session.flash)
  delete ctx.session.flash
  await next()
}

router.use(flash)
router.use(require('./main'))
router.use(require('./auth'))
router.use(authen)
router.use(require('./pikka'))

module.exports = router
