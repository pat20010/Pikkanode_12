const Router = require('koa-router')
const pikkaController = require('../controllers/pikka')
const koaBody = require('koa-body')
const pool = require('../config/connectDB')

const router = new Router()
const pikka = pikkaController(pool)

router.get('/create', pikka.createGetHandler)
router.post('/create', koaBody(), pikka.createPostHandler)

router.get('/pikka/:id', pikka.detailGetHandler)

router.post('/pikka/:id/comment', koaBody(), pikka.commentPostHandler)

router.post('/pikka/:id/like', koaBody(), pikka.likePostHandler)

module.exports = router.routes()
