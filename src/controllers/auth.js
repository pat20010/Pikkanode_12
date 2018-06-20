const mysqlError = require('mysql2/lib/constants/errors')
const usersModel = require('../models/users')
const bcrypt = require('bcrypt')

module.exports = function (pool) {
  return {

    async signInGetHandler (ctx) {
      console.log(`Flash : ` + ctx.flash)
      const data = {
        flash: ctx.flash
      }
      console.log(data)
      await ctx.render('signin', data)
    },

    async signInPostHandler (ctx) {
      let reqEmail = ctx.request.body.email
      let reqPassword = ctx.request.body.password
      const [rowsUser] = await usersModel.findByEmail(pool, reqEmail)

      if (!rowsUser) {
        ctx.session.flash = { error: 'Invalid email or password' }
        return ctx.redirect('/signin')
      }
      console.log(rowsUser)

      const same = await bcrypt.compare(reqPassword, rowsUser.password)
      if (!same) {
        ctx.session.flash = { error: `Invalid email or password` }
        return ctx.redirect('/signin')
      }

      ctx.session.userId = 20010
      ctx.redirect('/')
    },

    async signUpGetHandler (ctx) {
      await ctx.render('/signup')
    },

    async signUpPostHandler (ctx) {
      let reqEmail = ctx.request.body.email
      let reqPassword = ctx.request.body.password
      const encryptPassword = await bcrypt.hash(reqPassword, 12)
      console.log(encryptPassword)

      try {
        const rowsInsert = await usersModel.insertUsers(pool, reqEmail, encryptPassword)
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
