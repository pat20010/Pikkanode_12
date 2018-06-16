const Router = require('koa-router')
const { signIn, signUp } = require('../controllers/auth')
const koaBody = require('koa-body')

const router = new Router()

router.get('/signin', signIn.signInGetHandler)
router.post('/signin', signIn.signInPostHandler)

router.get('/signup', signUp.signUpGetHandler)
router.post('/signup', koaBody(), signUp.signUpPostHandler)

module.exports = router.routes()
