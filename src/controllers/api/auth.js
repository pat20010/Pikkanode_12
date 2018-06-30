const mysqlError = require('mysql2/lib/constants/errors')
const auth = require('../../service/auth')

async function signIn (ctx) {
  const { email, password } = ctx.request.body

  try {
    await auth.signIn(email, password)

    ctx.status = 200
    ctx.body = {}
  } catch (err) {
    console.error(err)
    ctx.status = 400
    ctx.body = {
      error: err.message
    }
  }
}

async function signUp (ctx) {
  const { email, password } = ctx.request.body

  try {
    const userId = await auth.signUp(email, password)
    ctx.status = 200
    ctx.body = {
      userId: userId
    }
  } catch (err) {
    console.error(err)

    switch (err.errno) {
      case mysqlError.ER_DUP_ENTRY:
        ctx.status = 400
        ctx.body = {
          error: 'Email already used'
        }
        break
      default:
        ctx.status = 400
        ctx.body = {
          error: err.message
        }
    }
  }
}

function signOut (ctx) {
  ctx.status = 200
  ctx.body = {}
}

module.exports = {
  signIn,
  signUp,
  signOut
}
