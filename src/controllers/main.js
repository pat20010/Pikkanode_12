module.exports = function () {
  return {

    async mainGetHandler (ctx) {
      if (ctx.session && ctx.session.userId) {
        await ctx.render('main')
        return
      }
      await ctx.render('index')
    }
  }
}
