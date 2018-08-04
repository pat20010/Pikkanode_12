const Router = require('koa-router')
const koaBody = require('koa-body')

const router = new Router()

const chackAuthen = async (ctx, next) => { // Authen middleware
  if (!ctx.session || !ctx.session.userId) {
    ctx.status = 401
    ctx.body = {
      error: 'unauthorized'
    }
    return
  }
  await next()
}

router.use('/auth', koaBody(), require('./auth'))
router.use(chackAuthen)
router.use(koaBody({ multipart: true }), require('./pikka'))

module.exports = router.routes()
