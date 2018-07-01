const Koa = require('koa')
const render = require('koa-ejs')
const session = require('koa-session')
const router = require('./routes')
const serve = require('koa-static')
const path = require('path')
const cors = require('@koa/cors')
const fse = require('fs-extra')

const app = new Koa()
app.use(cors({
  // origin: 'http://localhost:8000'
  credentials: true
}))

const dirPathImage = path.join(process.cwd(), 'src', 'public', 'imagesUpload')

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

const stripPrefix = async (ctx, next) => {
  if (!ctx.path.startsWith('/-')) {
    ctx.status = 404
    return
  }

  ctx.path = ctx.path.slice(2)
  await next()
}

app.keys = ['supersecret']
app.use(session(sessionConfig, app))

app.use(router.routes())
app.use(router.allowedMethods())

app.use(stripPrefix)
app.use(serve(path.join(process.cwd(), 'src', 'public')))

fse.ensureDir(dirPathImage, () => {
  app.listen(8000)
})
