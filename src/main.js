const Koa = require('koa')
const render = require('koa-ejs')
const router = require('./routes/index')
const serve = require('koa-static')
const path = require('path')

const app = new Koa()

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'template',
  viewExt: 'ejs',
  cache: false
})

app.use(serve(path.join(__dirname, 'public')))

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)
