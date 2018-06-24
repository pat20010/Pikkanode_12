const mysqlError = require('mysql2/lib/constants/errors')
const auth = require('../service/auth')
const { users } = require('../models')

async function signInGetHandler (ctx) {
  console.log(`Flash : ` + ctx.flash)
  const data = {
    flash: ctx.flash
  }

  console.log(data)
  await ctx.render('signin', data)
}

async function signInPostHandler (ctx) {
  const { email, password } = ctx.request.body

  try {
    const success = await auth.signIn(email, password)
    console.log(`Sign in status : ${success}`)

    if (!success) {
      ctx.session.flash = { error: 'Invalid email or password' }
      ctx.redirect('/signin')
      return
    }

    const dataUser = await users.getUserDataByEmail(email)

    if (!dataUser) {
      ctx.session.flash = { error: 'Invalid user not found' }
      ctx.redirect('/signin')
      return
    }

    ctx.session.userId = dataUser[0].id
    ctx.redirect('/')
  } catch (err) {
    ctx.session.flash = { error: err.message }
    ctx.redirect('/signin')
  }
}

async function signUpGetHandler (ctx) {
  await ctx.render('/signup')
}

async function signUpPostHandler (ctx) {
  const { email, password } = ctx.request.body

  try {
    const success = await auth.signUp(email, password)
    console.log(`Sign up status : ${success}`)

    if (!success) {
      ctx.redirect('/signup')
      return
    }

    ctx.redirect('/signin')
  } catch (err) {
    console.log(err)

    switch (err.errno) {
      case mysqlError.ER_DUP_ENTRY:
        ctx.status = 400
        ctx.body = `Email already used`
        break
      default:
        ctx.status = 500
        ctx.body = `Server Error`
    }
  }
}

module.exports = {
  signInGetHandler,
  signInPostHandler,
  signUpGetHandler,
  signUpPostHandler
}
