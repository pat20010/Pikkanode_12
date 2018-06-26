const mysqlError = require('mysql2/lib/constants/errors')
const auth = require('../../service/auth')

async function signInGetHandler (ctx) {
  const data = {
    flash: ctx.flash
  }

  console.log(data)
  await ctx.render('signin', data)
}

async function signInPostHandler (ctx) {
  const { email, password } = ctx.request.body

  try {
    const userId = await auth.signIn(email, password)

    ctx.session.userId = userId
    ctx.redirect('/')
  } catch (err) {
    console.error(err)

    ctx.session.flash = { error: err.message }
    ctx.redirect('/signin')
  }
}

async function signUpGetHandler (ctx) {
  const data = {
    flash: ctx.flash
  }

  console.log(data)
  await ctx.render('/signup', data)
}

async function signUpPostHandler (ctx) {
  const { email, password } = ctx.request.body

  try {
    await auth.signUp(email, password)
    console.log(`Sign up status : success`)

    ctx.redirect('/signin')
  } catch (err) {
    console.error(err)

    switch (err.errno) {
      case mysqlError.ER_DUP_ENTRY:
        ctx.session.flash = { error: `Email already used` }
        ctx.redirect('/signup')
        break
      default:
        ctx.session.flash = { error: `Server error` }
        ctx.redirect('/signup')
    }
  }
}

module.exports = {
  signInGetHandler,
  signInPostHandler,
  signUpGetHandler,
  signUpPostHandler
}
