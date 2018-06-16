const pool = require('../config/connectDB')

const signInGetHandler = async (ctx) => {
  await ctx.render('signin', {
  })
}

const signInPostHandler = (ctx) => {
  console.log()
  ctx.redirect('/')
}

const signUpGetHandler = async (ctx) => {
  await ctx.render('signup')
}

const signUpPostHandler = async (ctx) => {
  const insertUser = `INSERT INTO users(email, password) VALUES (?, ?)`
  let reqEmail = ctx.request.body.email
  let reqPassword = ctx.request.body.password

  try {
    const [rowsInsert] = await pool.query(insertUser, [reqEmail, reqPassword])
    console.log(rowsInsert)

    ctx.redirect('/signin')
  } catch (en) {
    console.log(en)

    ctx.redirect('/signup')
  }
}

module.exports.signIn = {
  signInGetHandler,
  signInPostHandler
}

module.exports.signUp = {
  signUpGetHandler,
  signUpPostHandler
}
