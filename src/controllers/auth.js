const signInGetHandler = (ctx) => {
  ctx.body = 'sign in get'
}

const signInPostHandler = (ctx) => {
  ctx.body = 'sign in post'
}

const signUpGetHandler = (ctx) => {
  ctx.body = 'sign up get'
}

const signUpPostHandler = (ctx) => {
  ctx.body = 'sign up post'
}

module.exports.signIn = {
  signInGetHandler,
  signInPostHandler
}

module.exports.signUp = {
  signUpGetHandler,
  signUpPostHandler
}
