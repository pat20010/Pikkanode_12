const Koa = require('koa')
const render = require('koa-ejs')
const session = require('koa-session')
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

const sessionStore = {}
const sessionConfig = {
  key: 'asd',
  maxAge: 1000 * 60 * 60,
  httpOnly: true,
  store: {
    get (key) {
      return sessionStore[key]
    },

    set (key, asd) {
      sessionStore[key] = asd
    },

    destroy (key) {
      delete sessionStore[key]
    }
  }
}

app.use(serve(path.join(__dirname, 'public')))
app.keys = ['supersecret']
app.use(session(sessionConfig, app))
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)
