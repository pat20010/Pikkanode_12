const auth = require('../../service/auth')

async function signIn (ctx) {
  const { email, password } = ctx.request.body

  try {
    await auth.signIn(email, password)

    ctx.status = 200
    ctx.body = {}
  } catch (err) {
    ctx.status = 400
    ctx.body = {
      error: err.message
    }
  }
}

function signUp (ctx) {
  ctx.status = 500
  ctx.body = {
    error: 'sign up not implement'
  }
}

function signOut (ctx) {
  ctx.status = 500
  ctx.body = {
    error: 'sign out not implement'
  }
}

module.exports = {
  signIn,
  signUp,
  signOut
}
