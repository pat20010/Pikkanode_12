const Router = require('koa-router')
const koaBody = require('koa-body')
const pikka = require('../../../../controllers/api/pikka')

const router = new Router()

router.get('/pikka', pikka.getPicturePikka)
router.post('/pikka', koaBody(), pikka.postPicturePikka)

module.exports = router.routes()
