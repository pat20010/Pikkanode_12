const Router = require('koa-router')
const authController = require('../controllers/auth')
const koaBody = require('koa-body')
const pool = require('../config/connectDB')

const router = new Router()
const auth = authController(pool)

const authAlready = async (ctx, next) => { // Auth already exist
  if (ctx.session && (ctx.session.userId && ctx.session.userId === 20010)) {
    console.log(`session userId : ${ctx.session.userId}`)
    return ctx.redirect('/')
  }

  await next()
}

router.get('/signin', authAlready, auth.signInGetHandler)
router.post('/signin', koaBody(), auth.signInPostHandler)

router.get('/signup', authAlready, auth.signUpGetHandler)
router.post('/signup', koaBody(), auth.signUpPostHandler)

module.exports = router.routes()
