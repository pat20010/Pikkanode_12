const mysqlError = require('mysql2/lib/constants/errors')
const usersModel = require('../models/users')
const bcrypt = require('bcrypt')

module.exports = function (pool) {
  return {

    async signInGetHandler (ctx) {
      await ctx.render('signin', {
      })
    },

    async signInPostHandler (ctx) {
      console.log()
      ctx.redirect('/')
    },

    async signUpGetHandler (ctx) {
      await ctx.render('signup')
    },

    async signUpPostHandler (ctx) {
      let reqEmail = ctx.request.body.email
      let reqPassword = ctx.request.body.password
      const encryptPassword = await bcrypt.hash(reqPassword, 12)
      console.log(encryptPassword)

      try {
        const [rowsInsert] = await usersModel.insertUsers(pool, reqEmail, reqPassword)
        console.log(rowsInsert)

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
  }
}
