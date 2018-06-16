const Router = require('koa-router')
const { signIn, signUp } = require('../controllers/auth')

const router = new Router()

router.get('/signin', signIn.signInGetHandler)
router.post('/signin', signIn.signInPostHandler)

router.get('/signup', signUp.signUpGetHandler)
router.post('/signup', signUp.signUpPostHandler)

module.exports = router.routes()
