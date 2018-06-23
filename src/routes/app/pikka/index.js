const Router = require('koa-router')
const koaBody = require('koa-body')

const pikka = require('../../../controllers/pikka')

const router = new Router()

router.get('/create', pikka.createGetHandler)
router.post('/create', koaBody({ multipart: true }), pikka.createPostHandler)

router.get('/pikka/:id', pikka.detailGetHandler)

router.post('/pikka/:id/comment', koaBody(), pikka.commentPostHandler)

router.post('/pikka/:id/like', koaBody(), pikka.likePostHandler)

module.exports = router.routes()
