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

router.use(require('./main'))
router.use(require('./auth'))
router.use(authen)
router.use(require('./pikka'))

module.exports = router.routes()
