const Router = require('koa-router')
const auth = require('../../../../controllers/api/auth')

const router = new Router()

router.post('/signin', auth.signIn)
router.post('/signup', auth.signUp)
router.post('/signout', auth.signOut)

module.exports = router.routes()
