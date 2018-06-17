const Router = require('koa-router')
const authController = require('../controllers/auth')
const koaBody = require('koa-body')
const pool = require('../config/connectDB')

const router = new Router()
const auth = authController(pool)

router.get('/signin', auth.signInGetHandler)
router.post('/signin', auth.signInPostHandler)

router.get('/signup', auth.signUpGetHandler)
router.post('/signup', koaBody(), auth.signUpPostHandler)

module.exports = router.routes()
