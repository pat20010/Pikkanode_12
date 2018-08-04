const Router = require('koa-router')
const pikka = require('../../../../controllers/api/pikka')

const router = new Router()

router.get('/pikka', pikka.getPicturePikka)
router.post('/pikka', pikka.postPicturePikka)

module.exports = router.routes()
