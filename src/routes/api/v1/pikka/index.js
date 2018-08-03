const Router = require('koa-router')
const pikka = require('../../../../controllers/api/pikka')

const router = new Router()

router.get('/pikka', pikka.getPicturePikka)

router.post('/pikka', ctx => {
  ctx.status = 200
  ctx.body = {
    id: '2e33875e-a508-450e-a428-433a6ffd9ed6',
    createdAt: '2018-06-19T10:33:12.000Z'
  }
})

module.exports = router.routes()
