const signInGetHandler = async (ctx) => {
  await ctx.render('signin', {
  })
}

const signInPostHandler = (ctx) => {
  console.log()
  ctx.redirect('/')
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
