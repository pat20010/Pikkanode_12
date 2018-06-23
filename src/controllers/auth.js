const mysqlError = require('mysql2/lib/constants/errors')
const { users } = require('../models')
const bcrypt = require('bcrypt')

async function signInGetHandler (ctx) {
  console.log(`Flash : ` + ctx.flash)
  const data = {
    flash: ctx.flash
  }

  console.log(data)
  await ctx.render('signin', data)
}

async function signInPostHandler (ctx) {
  let reqEmail = ctx.request.body.email
  let reqPassword = ctx.request.body.password
  const rowUser = await users.getUserDataByEmail(reqEmail)

  console.log(rowUser)
  if (!rowUser) {
    ctx.session.flash = { error: 'Invalid email or password' }
    return ctx.redirect('/signin')
  }

  const same = await bcrypt.compare(reqPassword, rowUser[0].password)
  if (!same) {
    ctx.session.flash = { error: `Invalid email or password` }
    return ctx.redirect('/signin')
  }

  ctx.session.userId = rowUser[0].id
  ctx.redirect('/')
}

async function signUpGetHandler (ctx) {
  await ctx.render('/signup')
}

async function signUpPostHandler (ctx) {
  let reqEmail = ctx.request.body.email
  let reqPassword = ctx.request.body.password
  const encryptPassword = await bcrypt.hash(reqPassword, 12)
  console.log(encryptPassword)

  try {
    const rowInsert = await users.insertUser(reqEmail, reqPassword)
    console.log(rowInsert)

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
